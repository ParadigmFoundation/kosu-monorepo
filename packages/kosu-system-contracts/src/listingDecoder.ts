export const listingDecoder = (listing: any[]): Listing => {
    return {
        status: listing[0],
        applicationBlock: listing[1],
        tendermintPublicKey: listing[2],
        owner: listing[3],
    };
};
