import { FastifyRequest } from "fastify"
import React from "preact"
type Props = {
	children:preact.FunctionComponent
	serverSideProps:{
		curPath:string,
		ans:number
	}
}
export default function Layout(props:Props){
	return(
		<>
			{props.serverSideProps.curPath} ({props.serverSideProps.ans})
			This is first layout
			{props.children}
		</>
	)
}

export async function getServerSideProps(req:FastifyRequest){
	const res = await new Promise(r=>setTimeout(()=>r(42),200))
	return {
		curPath:req.url,
		ans:res
	}
}
