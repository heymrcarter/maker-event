#Maker Event

This project uses Webtask.io as an endpoint to ultimately forward the request to [IFTTT's Maker channel](https://itfff.com/maker).

##Usage

Maker Event uses [Webtask.io](http://webtask.io). Run `npm install` to install it.

This webtask requires 1 secret, MAKER_ENDPOINT, be injected into the Webtask sandbox when you create the task. Run the following command to create the webtask:

	wt create --secret MAKER_ENDPOINT=https://maker.ifttt.com/trigger/{event}/with/key/{key}
	
Where {event} is the name of the event you've configured in your IFTTT recipe and {key} is the Maker API key you are given.\

Executing the command will result in the Webtask URL that you can begin sending requests to.