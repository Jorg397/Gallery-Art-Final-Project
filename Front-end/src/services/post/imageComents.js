import Api from "../../interceptors/base"

export const imageComents = (data) => {
    return Api.post('/imagecomments', {image: data})
}