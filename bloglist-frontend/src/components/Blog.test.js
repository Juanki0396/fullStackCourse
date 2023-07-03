import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Blog component tests", () => {
    let container = null
    let fetchBlogs = null

    beforeEach(() => {
        const blog = {
            title: "Blog title",
            author: "Blog author",
            url: "Blog url",
            likes: 0,
            user: {
                userName: "Mom",
            },
        }
        const user = {
            token: "asdfsadfsdfs",
            userName: "Mom",
        }
        fetchBlogs = jest.fn()

        container = render(
            <Blog blog={blog} user={user} fetchBlogs={fetchBlogs} />
        ).container
    })

    test("URL and likes not redered by default", async () => {
        const titleDiv = container.querySelector(".blog-basic")
        const urlDiv = container.querySelector(".blog-extra")

        expect(titleDiv).toBeDefined()
        expect(urlDiv).toHaveStyle({ display: "none" })
    })

    test("URL and likes redered after show is clicked", async () => {
        const user = userEvent.setup()
        const button = screen.getByText("Show")
        await user.click(button)

        const titleDiv = container.querySelector(".blog-basic")
        const urlDiv = container.querySelector(".blog-extra")

        expect(titleDiv).toBeDefined()
        expect(urlDiv).not.toHaveStyle({ display: "None" })
    })

    test("URL and likes redered after show is clicked", async () => {
        console.error = jest.fn()
        const user = userEvent.setup()
        const button = screen.getByText("Show")
        await user.click(button)

        const likeButton = screen.getByText("Like")
        await user.click(likeButton)
        await user.click(likeButton)

        expect(fetchBlogs.mock.calls).toHaveLength(2)
    })
})
