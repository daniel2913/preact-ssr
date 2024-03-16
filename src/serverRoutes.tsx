import { FastifyRequest } from "fastify";

export default Object.fromEntries(Object.entries(
	import.meta.glob<(req:FastifyRequest)=>any>("./routes/**/*.tsx",{import:"getServerSideProps",eager:true})
)
	.map(([path,f])=>[`/${path.split("/").slice(2).join("/")}`,f])
)
