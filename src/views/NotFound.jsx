import { Link } from "react-router-dom";
import "./NotFound.css";
export default function NotFound() {
  return (
    <div className="w-full min-h-full">
      <section className="page_404 h-full">
        <div className="w-full h-full">
          <div className="h-full">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center font-black pb-3 ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you`re lost</h3>

                  <p className="font-bold">the page you are looking for not avaible!</p>

                  <Link to={'/login'} className="link_404 rounded">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
