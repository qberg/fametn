import { Col, Container, Row } from "react-bootstrap";

import styles from "./footer.module.css"
const Footer = () => {
	return (
		<footer>
			<Container className="bg-gray-50 h-1/2 body-font bg-black float: left" fluid>
				<Container>
					<Row >
						<Col lg={3} md={4}>
							<div className="pt-5 bord" id="left">
								<div>
									<p className="text-white hover:text-gray-800 pb-4">left</p>
									<nav className="list-none mb-10">
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
									</nav>
								</div>
							</div>
						</Col>
						<Col lg={3} md={4}>
							<div className="pt-5" id="left">
								<div>
									<p className="text-white hover:text-gray-800 pb-4">second</p>
									<nav className="list-none mb-10">
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
									</nav>
								</div>
							</div>
						</Col>

						<Col lg={3} md={4}>
							<div className="pt-5 box1" id="left">
								<div>
									<p className="text-white hover:text-gray-800 pb-4">First</p>
									<nav className="list-none mb-10">
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
											<br></br>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
										<li className="mb-3">
											<a className="text-gray-600 hover:text-gray-800">lorem ipsum</a>
										</li>
									</nav>
									<hr className="line"></hr>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col lg={6}>
							<a className="text-gray-600 hover:text-gray-800">Terms and condition</a>
							<span className="separator">|</span>
							<a className="text-gray-600 hover:text-gray-800">Privacy and Policy</a>
						</Col>
						<Col lg={6}>
							<a style={{marginLeft: "ms-auto"}} className="text-gray-600 hover:text-gray-800"> © 2024 All rights reserved</a>
						</Col>
					</Row>
				</Container>
			</Container>
		</footer>

	)
}
export default Footer;