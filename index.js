const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Funzione per creare un nuovo post
async function createPost(title, slug, image, content, published) {
    return prisma.post.create({
        data: {
            title,
            slug,
            image,
            content,
            published,
        },
    });
}

//Funzione per leggere un post usando lo slug
async function getPostBySlug(slug) {
    return prisma.post.findUnique({
        where: {
            slug,
        },
    });
}

//Funzione per restituire l'elenco di tutti i post
async function getAllPosts() {
    return prisma.post.findMany();
}

//Funzione per modificare un post
async function updatePost(id, data) {
    return prisma.post.update({
        where: {
            id,
        },
        data,
    });
}

//Funzione per eliminare un post
async function deletePost(id) {
    return prisma.post.delete({
        where: {
            id,
        },
    });
}

const slugify = (title) => {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const uniquePart = Date.now().toString(36); // Aggiunge una parte unica basata sulla data
    return `${baseSlug}-${uniquePart}`;
};

async function main() {
    try {
        //crea un nuovo post
        const newPost = await createPost(
            "Titolo",
            slugify("Titolo"),
            "url-immagine",
            "Contenuto del post",
            true
        );
        console.log('Nuovo Post creato:', newPost);

        //leggi un post usando lo slug
        const postBySlug = await getPostBySlug(newPost.slug);
        console.log('Post trovato per slug:', postBySlug);

        //ottieni l'elenco di tutti i post
        const allPosts = await getAllPosts();
        console.log('Elenco di tutti i Post:', allPosts);

        //modifica un post
        const updatedPost = await updatePost(newPost.id, { title: "Nuovo Titolo" });
        console.log('Post modificato:', updatedPost);

        //elimina un post
        await deletePost(newPost.id);
        console.log('Post eliminato');

        //chiudi la connessione del prisma client
        await prisma.$disconnect();
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}

main();
