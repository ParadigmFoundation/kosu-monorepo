interface IVoting {
    function userWinningTokens(uint, address) external view returns (bool, uint);
}