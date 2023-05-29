import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRole = (wallet_id) => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await axios.post('http://localhost:8000/get_role/', {
                    wallet_id: wallet_id,
                });
                setRole(response.data.role);
            } catch (error) {
                console.error('Failed to fetch role:', error);
            }
        };

        fetchRole();
    }, [wallet_id]);

    return { role };
};

export default useFetchRole;