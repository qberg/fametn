

const Footer = () => {
    return (
        <footer className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items start p-20 body-font bg-black float: left"  style={{ display: 'flex' }}>
          
          <div className="p-5 bord"  id="left">
            <ul>
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
            </ul>
          </div>
          <div className="p-5" id="left">
            <ul>
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
            </ul>
          </div>
          <div className="p-5 box1"  id="left">
            
            <ul>
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
            </ul>          
          </div>
          <a className="p-5 bottom-left text-gray-600 hover:text-gray-800">Terms and condition</a>
    <span className="separator">|</span> {/* Separator */}
    <a className="p-5 bottom-lefts text-gray-600 hover:text-gray-800">Privacy and Policy</a>
    <a className="p-5 bottom-right text-gray-600 hover:text-gray-800">@2024All rights reserved</a>

          </footer>
    )
}
export default Footer;