import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import BlogForm from "./BlogForm"

jest.mock("axios")

describe("BlogForm tests", () => {
    let container = null
    let fetchBlogs = null
    let setNotification = null

    beforeEach(() => {
        fetchBlogs = jest.fn()
        setNotification = jest.fn()

        const user = {
            userName: "Mom",
            token: "123412312"
        }
        container = render(
            <BlogForm
                user={user}
                fetchBlogs={fetchBlogs}
                setNotification={setNotification}
            />
        ).container
    })

    test("Form calls backend", async () => {
        axios.post.mockResolvedValue(0)

        const user = userEvent.setup()
        const titleInput = container.querySelector("#blogTitle")
        const authorInput = container.querySelector("#blogAuthor")
        const urlInput = container.querySelector("#blogUrl")
        const button = container.querySelector(".submitButton")

        await user.type(titleInput, "title")
        await user.type(authorInput, "author")
        await user.type(urlInput, "url")

        await user.click(button)

        expect(setNotification.mock.calls).toHaveLength(0)
        expect(fetchBlogs.mock.calls).toHaveLength(1)
    })
})
