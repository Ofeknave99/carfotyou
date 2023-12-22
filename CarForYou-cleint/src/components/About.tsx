import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (<>
        <div className="about-class">
            <div>
                <h1>About CarForYou</h1>
                <p>
                    Welcome to CarForYou, your go-to destination for buying and selling cars! Whether you're a car enthusiast looking for your dream ride or a seller wanting to connect with potential buyers, CarForYou is the perfect platform for you.
                </p>
                <p>
                    Our mission is to provide a seamless and user-friendly experience for both buyers and sellers in the automotive industry. With CarForYou, you can browse through a wide selection of cars, add your favorite ones to your wishlist, and easily get in touch with sellers.
                </p>
                <p>
                    For businesses, we offer a tailored solution to help you showcase your inventory and connect with potential customers. CarForYou is not just a marketplace; it's a community that brings car enthusiasts and sellers together.
                </p>
                <p>
                    Thank you for choosing CarForYou as your trusted platform. Feel free to explore our listings, create your account, and start your automotive journey today!
                </p>
                <p>
                    <strong>Why Choose CarForYou?</strong>
                </p>
                <ul>
                    <li>Wide Selection: Discover a diverse range of cars to suit your preferences.</li>
                    <li>Wishlist Feature: Save your favorite cars for easy access.</li>
                    <li>Seamless Transactions: Connect with sellers effortlessly.</li>
                    <li>Business Solutions: Grow your dealership with our tailored business services.</li>
                    <li>Community Engagement: Join a passionate community of car enthusiasts and sellers.</li>
                </ul>
                <p>
                    Whether you're looking for your next car or seeking to expand your business, CarForYou is here to serve your automotive needs. We're dedicated to making the car buying and selling experience enjoyable and hassle-free.
                </p>
                <p>
                    Thank you for being a part of the CarForYou community. Start exploring, start connecting, and start your automotive journey today!
                </p>
            </div>
        </div>
    </>);
}

export default About;