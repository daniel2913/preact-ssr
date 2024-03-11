type Props = {
	test:string
}

export default function Notmain(props:Props){
	return(
		<main>
			<h1>This is not a main page</h1>
			<h2>{props.test}</h2>
		</main>
	)
}
