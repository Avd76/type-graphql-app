import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, createClient } from 'urql'

const client = createClient({
  
  url: "http://localhost:5000/graphql",
  fetchOptions: ()=> {
    let token;
    
    if(typeof window !== "undefined"){
     token = localStorage.getItem("token")

    }
   
    return {
      headers: {authorization: token ? token : ""}
    }
    
  }  
 
})

export default function App({ Component, pageProps }: AppProps) {
 
 return( 
 
 <Provider value={client}>
<Component {...pageProps} />
  </Provider>

 )
   
}
