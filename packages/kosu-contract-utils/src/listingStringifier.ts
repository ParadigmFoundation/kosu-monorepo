import { Listing, PrettyListing } from "@kosu/types";

export const listingStringifier = (listing: Listing): PrettyListing => {
    const prettyListing = {
        stakedBalance: listing.stakedBalance.toString(),
        applicationBlock: listing.applicationBlock.toString(),
        confirmationBlock: listing.confirmationBlock.toString(),
        exitBlock: listing.exitBlock.toString(),
        rewardRate: listing.rewardRate.toString(),
        lastRewardBlock: listing.lastRewardBlock.toString(),
        currentChallenge: listing.currentChallenge.toString(),
    };

    return { ...listing, ...prettyListing };
};
