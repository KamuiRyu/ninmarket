import React, { useState } from "react";
import Navbar from "../layout/header/Navbar";
import HeaderJumbotron from "../layout/header/HeaderJumbotron";
import Header from "../layout/Header";
import AutheticationModal from "../layout/auth/AutheticationModal";

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="App">
            {isModalOpen && (
                <AutheticationModal isOpen={isModalOpen} onClose={closeModal} />
            )}
            <Header>
                <Navbar openModal={openModal} />
                <HeaderJumbotron height="h-60vh" />
            </Header>
            <main>
                <h1>TESTE</h1>
            </main>
        </div>
    );
}

export default Home;
