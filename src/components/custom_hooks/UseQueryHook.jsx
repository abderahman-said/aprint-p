import { useQuery } from 'react-query'




export const useQueryHook = (qName , onSuccess , onError , fetcher, enabled) => {
 return useQuery(qName , fetcher ,{
    onSuccess , 
    onError,
    enabled : enabled
 })

}
