export const filterData = (data, filter) => {
    if (filter === "all") {
        return data;
    }
    return data.filter((item) => item.order_status === filter);
    
}