'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import ToggleButtons from '../components/ToggleButtons';


const ClientComponent = () => {
    return (
        <div>
            <Link href="/">
                <FaHome />
            </Link>
            <ToggleButtons />
        </div>
    );
};

export default ClientComponent;