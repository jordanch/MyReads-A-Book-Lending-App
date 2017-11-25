const htmlparser = require('htmlparser2');

let parser = htmlparser.Parser({
    onopentag: function(name, atrrs) {
        console.log(name, attrs);
    }
})

parser.write("<p>Triodos Sustainable Bond Fund invests in euro-denominated bonds issued by listed companies, governments and semi-public institutions, with a credit rating of at least investment grade. The (sub-) sovereign bonds in which the fund invests have been issued by EU member states or their local or regional governments or by supranational organisations. The fund also invests in listed euro-denominated impact bonds with an investment-grade credit rating.</p><p>Our investment process consists of building the Triodos Sustainable Investment Universe based on rigorous criteria set by Triodos Research, and subsequently constructing the investment portfolio.</p> <p>Engagement with companies starts during the investment selection process and continues after they have been selected and added to the investible universe. Triodos Research actively monitors companies and carries out a full re-assessment once every three years. A potential breach of Triodos’ minimum standards leads to an in-depth investigation and could result in exclusion from the Triodos Sustainable Investment Universe.</p><p>The actual portfolio construction has been delegated to Delta Lloyd Asset Management, which selects bonds from the Triodos Sustainable Investment Universe based on fundamental financial analysis.</p>")