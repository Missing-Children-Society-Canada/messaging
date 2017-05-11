module.exports = {
    providers: {
        twitter: 1,
        facebook: 2,
        instagram: 3,

        getProvider(num) {
            switch(num) {
                case 1:
                    return "Twitter";
                case 2:
                    return "Facebook";
                case 3:
                    return "Instagram";
                default:
                    return "unknown";
            }
        }
    }
}