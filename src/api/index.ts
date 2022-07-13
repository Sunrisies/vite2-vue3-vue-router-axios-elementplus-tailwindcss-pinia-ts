import service from "@/utils/service.ts";

//首页数据
export const getIndex = () => {
  return service.get('/api/index')
}