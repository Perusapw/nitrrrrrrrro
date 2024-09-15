"use strict";

// Dependencies
const randomUserAgent = require("random-useragent")
const discordNitro = require("discordnitro")
const request = require("request-async")

// Variables
const args = process.argv.slice(2)

//Main
if(!args.length) return console.log("usage: node index.js <speed(Milliseconds)> <token>")
if(!args[0]) return console.log("Invalid speed.")
if(isNaN(args[0])) return console.log("speed is not a number.")
if(!args[1]) return console.log("Invalid token.")

console.log("Generating & Checking has started.")
setInterval(async function(){
    try{
        const code = discordNitro(1)[0]

        const response = await request(`https://discordapp.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, {
            headers: {
                "User-Agent": randomUserAgent.getRandom()
            }
        })

        try{
            if(response.statusCode === 200){
                console.log(`Valid nitro code: ${code}`)

                var response2 = await request(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, {
                    headers: {
                        authorization: args[1]
                    }
                })
                response2 = response2.body

                if(response2.indexOf("redeemed already") !== -1){
                    console.log(`[32mNitro code[33m | [35m[4m${code}[0m [32mis already redeemed. [33m|[36m Aezteru_ Checker ✅`)
                }else if(response2.indexOf("nitro") !== -1){
                    console.log(Chalk.greenBright(`[32mNitro code[33m | [35m[4m${code}[0m claimed. [33m|[36m Aezteru_ Checker ✅`))
                }else{
                    console.log(`[31mUnknown Code[33m | [35m[4m${code}[0m [33m|[36m Aezteru_ Checker ✅`)
                }
            }else{
                console.log(`[31mInvalid Code[33m | [35m[4m${code}[0m [33m|[36m Aezteru_ Checker ✅`)
            }
        }catch{
            console.log(`[31mInvalid Code[33m | [35m[4m${code}[0m [33m|[36m Aezteru_ Checker ✅`)
        }
    }catch{}
}, args[0])
