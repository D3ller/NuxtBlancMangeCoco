/**
 *
 * @param link
 */
export function generateQR(link: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${link}`;
}