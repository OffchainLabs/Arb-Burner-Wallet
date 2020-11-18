
 const useTwitter = ( account:string)=>{
    const text = `.@Arbi_Swap hey @OffchainLabs, gimme some Arbiswap test tokens for my burner wallet plz 🙏! https://burner.arbitrum.io/  ${account || '0x*YOUR**ETH**ADDRESS**GOES**HERE**'}`
      .split(' ')
      .join('%20')
    const handleClick = () => {
      window.open('https://twi' + `tter.com/intent/tweet?text=${text}`)
    }
    return handleClick
}

export default useTwitter