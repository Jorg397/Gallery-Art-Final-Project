import React from "react";

export default function Footer() {
	//returns a footer component with social media adress telephone and terms of use a link to the about page and a link to help page
	return (
		<div
			className='w-auto p-4 bottom-0 h-auto relative'
			style={{ color: "white", marginBottom: "20px" }}>
			<div className='lg:flex  lg:mt-3 md:mx-12 lg:mx-28 lg:justify-between '>
				<div className='mb-4 lg:columns-1 w-96'>
					<p
						className='ml-48'
						style={{ fontSize: "24px", fontWeight: "bold" }}>
						Art
						<label
							style={{
								fontSize: "38px",
								fontWeight: "bold",
								color: "rgb(0, 173, 173)",
							}}>
							.
						</label>
						Gallery
					</p>
					<a
						style={{
							marginLeft: "50px",
							textDecoration: "underline",
							fontSize: "14px",
							color: "white",
						}}
						href='/home#about'>
						•Ayuda
					</a>
					<a
						style={{
							marginLeft: "5px",
							textDecoration: "underline",
							fontSize: "14px",
							color: "white",
						}}
						href='/home#about'>
						•Sobre nosotros
					</a>
					<a
						style={{
							marginLeft: "5px",
							textDecoration: "underline",
							fontSize: "14px",
							color: "white",
						}}
						href='/home#gallery'>
						•Terminos y condiciones
					</a>
					<a
						style={{
							marginLeft: "5px",
							textDecoration: "underline",
							fontSize: "14px",
							color: "white",
						}}
						href='/home#gallery'>
						•Ver galeria de pinturas
					</a>
				</div>
				<div className='flex flex-wrap gap-4 flex-col-reverse'>
					<div>
						<label style={{ fontSize: "16px", fontWeight: "bold" }}>
							Direccion:
						</label>
						<p>
							<a
								style={{ color: "white" }}
								href='https://www.google.com/maps/'
								target={"_blank"}>
								Fakeadress 123-California US
							</a>
						</p>
						<p>
							<label
								style={{
									fontSize: "16px",
									fontWeight: "bold",
								}}>
								Telefono:
							</label>
						</p>
						<p>
							<a
								style={{ color: "white" }}
								href='tel:+442033363636'>
								+54 011-4567-7891
							</a>
						</p>
					</div>
					<div className='flex'>
						<p
							style={{
								fontSize: "16px",
								fontWeight: "bold",
								marginTop: "10px",
								marginRight: "10px",
							}}>
							Redes Sociales:
						</p>
						<a target='_blank' href='https://www.facebook.com/'>
							<img
								src='https://img.icons8.com/color/48/000000/facebook-new.png'
								alt='facebook'
							/>
						</a>
						<a href='https://www.instagram.com/' target='_blank'>
							<img
								src='https://img.icons8.com/color/48/000000/instagram-new.png'
								alt='instagram'
							/>
						</a>
						<a target='_blank' href='https://www.twitter.com/'>
							<img
								src='https://img.icons8.com/color/48/000000/twitter.png'
								alt='twitter'
							/>
						</a>
						<a target='_blank' href='https://www.youtube.com/'>
							<img
								src='https://img.icons8.com/color/48/000000/youtube-play.png'
								alt='youtube'
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
