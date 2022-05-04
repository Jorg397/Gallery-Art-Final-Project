import Api from "../../interceptors/base";

export const deleteComments = async (idComment) => {
    try {
        await Api.delete(`/commentUser/${idComment}`);
    } catch (error) {
        console.log(error);
    }
}