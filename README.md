# Shelly - The bot of your dreams 😍

Do you love challenging your friends to inhouses of your favorite games? 
Say no more, Shelly got you covered. 

Shelly is a general purpose discord bot that can generate and shuffle teams aswell, It's pretty neat. 


## How do i run Shelly on my computer?

The answer is simple! 
First, you clone the repository and install dependencies:
```
git clone https://github.com/felky/shelly.git

and then...

npm i
```

Then create your .env file in the root directory and add these variables
```
{
	DISCORD_TOKEN="your discord token" 
	W2G_KEY="your Watch2Gether api-key"
	PREFIX="your preferred command prefix" 
}
```
When you are all done setting up Shelly, run the bot using:
```
npm start
```