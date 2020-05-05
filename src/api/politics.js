import ajax from "@u/ajax.js";

// 获取所有政治面貌
export const queryPolitics = () => ajax.get("/user/queryPolitics");
