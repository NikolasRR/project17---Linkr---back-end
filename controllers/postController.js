import postsRepository from "../repositories/postRepository.js"
import urlMetadata from "url-metadata"
import findHashtags from "find-hashtags";
import dayjs from "dayjs";

export async function postPublication(req, res) {
    try {
        const { id } = res.locals.user
        const { text, url } = res.locals

        const hashtags = findHashtags(text);

        const { rows } = await postsRepository.verifyUser(id);
        if (rows.length === 0) {
            return res.status(401).send("Você não tem cadastro")
        }

        const { title, description, image } = await urlMetadata(url)

        const metadatas = {
            title,
            description,
            image
        };

        const { rows: result } = await postsRepository.postLink(title, description, image, url)
        const linkId = result[0].id

        const { rows: data } = await postsRepository.postPublication(id, text, url, linkId);
        const postId = data[0].id;

        if (hashtags.length > 0) {
            hashtags.forEach(async hashtag => {
                const { rows: result } = await postsRepository.getHashtag(hashtag);

                if (result.length === 0) {
                    const { rows: data } = await postsRepository.postHashtag(hashtag);
                    const hashtagId = data[0].id;
                    await postsRepository.postPublicationHashtag(postId, hashtagId);
                } else {
                    const hashtagId = result[0].id;
                    await postsRepository.postPublicationHashtag(postId, hashtagId);
                    await postsRepository.addCountHashtag(hashtagId);
                }
            }
            )
        }
        res.sendStatus(200)

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function getPublications(req, res) {
    const { lastId } = req.query;   

    try {
        const { rows } = await postsRepository.getPublications(parseInt(lastId));
        console.log(rows);
        res.status(200).send(rows);

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function deletePost(req, res) {
    const { linkId } = req.query;

    try {
        await postsRepository.deletePost(linkId);
        res.sendStatus(204);
    } catch (error) {
        console.log('erro ao deletar',error);
        res.sendStatus(500);
    }
}

export async function editPost(req, res) {
    const { text } = req.body;
    const postId = parseInt(req.query.postId);
    const hashtags = findHashtags(text);

    try {
        await postsRepository.editPostContent(postId, text);
        await postsRepository.deleteExistingPostHashtags(postId);

        if (hashtags.length > 0) {
            hashtags.forEach(async hashtag => {
                const { rows: result } = await postsRepository.getHashtag(hashtag);

                if (result.length === 0) {
                    const { rows: data } = await postsRepository.postHashtag(hashtag);
                    const hashtagId = data[0].id;
                    await postsRepository.postPublicationHashtag(postId, hashtagId);
                } else {
                    const hashtagId = result[0].id;
                    await postsRepository.postPublicationHashtag(postId, hashtagId);
                }
            })
        }
        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function newPostsVerifier (req, res) {
    const {lastPostId} = req.query;

    try {
        const { rows } = await postsRepository.newPosts(parseInt(lastPostId));
        
        if (rows.length > 0) {
            return res.send({ amount: rows.length }).status(200);
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
