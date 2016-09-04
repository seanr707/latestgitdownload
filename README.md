# Latest Git Download
## By seanr707

Hello!

This project is a microservice/microAPI that redirects users to the latest release file of a github project. 

All it requires is the latest url from the user

i.e. `https://github.com/theUser/theProject/releases/latest`

And a predictive filename which can be

`myfile.blah`

or

`myfile-VERSION.blah` Where 'VERSION' is replaced with the version number retreived from Github.

The project is very simple, only requiring express and simple-git npm libraries.
