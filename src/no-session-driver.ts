export default function noSessionDriver() {
    const disabled = async () => {
        throw new Error('Sessions are disabled for this application.');
    };

    return {
        getItem: disabled,
        removeItem: disabled,
        setItem: disabled,
    };
}
