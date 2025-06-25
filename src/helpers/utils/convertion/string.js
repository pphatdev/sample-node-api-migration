export const paramsToNameFile = (params) => {
    if (!params || typeof params !== 'object') {
        return '';
    }
    return Object.entries(params)
        .map(([key, value]) => (typeof value === 'object' && value !== null) ? paramsToNameFile(value) : `${key}-${String(value).replace(/![a-zA-Z0-9]$/g, "")}`)
        .join('_')
        .replace(/[^a-zA-Z0-9_-]/g, '_') // Replace any non-alphanumeric characters with underscores
        .toLowerCase(); // Convert to lowercase for consistency
}