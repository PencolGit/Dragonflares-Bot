import { Manager } from '../../../lib';

export class PingManager extends Manager{
    constructor(plugin){
        super(plugin);
    }

    enable(){
        if(!this.enabled){
            this.client.on('message', async message => this.myListener(message))
        }
        super.enable();
    }

    myListener = (message) => {
        if(message.author.bot) return;
        if(message.mentions.has( this.client.user))
		{	
			message.channel.send("Please, refrain from pinging me. I am busy!")
	
        }
        //Me and Boom
        else if(message.mentions.has('153558944478920704') && this.client.users.cache.find(u=> u.id == "153558944478920704").presence.status == "offline") {
            message.channel.send("The ban-hammer is ready, hope it was worth it!")
        }
  
        else if(message.mentions.has('236891878690258944') && this.client.users.cache.find(u=> u.id == "236891878690258944").presence.status == "offline")
		{	
			message.channel.send("You had better hope that ping was important... He's grumpy..")
		}
    }

    disable(){
        if(this.enabled){

        }
        super.disable();
    }
}