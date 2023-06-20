const totalLikes = blogArr => blogArr.reduce((likes, b) => likes + b.likes, 0)

const favoriteBlog = blogArr => {
    if (blogArr.length === 0) {
        return null
    }

    const favIdx = blogArr.reduce((acc, blog, idx, arr) => {
        if (blog.likes > arr[acc].likes) {
            return idx
        }
        return acc
    }, 0) 

    return {...blogArr[favIdx]}
}

const mostBlogs = blogArr => {
    if (blogArr.length === 0) {
        return null
    }

    const authors = blogArr
        .reduce((acc, b) => {
            if(acc[b.author] == null) {
                acc[b.author] = 1
            } 
            else {
                acc[b.author] += 1
            }
            return acc
        }, {})

    const mostBlogsAuthor = Object
        .keys(authors)
        .map(author => {
            return {
                author,
                blogs: authors[author]
            }
        })
        .reduce((max, a) => {
            if (!max.blogs || a.blogs > max.blogs) {
                return a
            }
            return max
        }, {})
        
    return mostBlogsAuthor
}

const mostLikes = blogArr => {
    if (blogArr.length === 0) {
        return null
    }

    const authors = blogArr
        .reduce((acc, b) => {
            if(acc[b.author] == null) {
                acc[b.author] = b.likes
            } 
            else {
                acc[b.author] += b.likes
            }
            return acc
        }, {})

    const mostBlogsAuthor = Object
        .keys(authors)
        .map(author => {
            return {
                author,
                likes: authors[author]
            }
        })
        .reduce((max, a) => {
            if (!max.likes || a.likes > max.likes) {
                return a
            }
            return max
        }, {})
        
    return mostBlogsAuthor
}

module.exports = { 
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}
