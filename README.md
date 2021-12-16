# Simple Express Typescript MySQL CRUD

After several months working with embedded system in C & C++, then ASP.NET backend and SQL Server, I think writing code in Express with Typescript is the path that I am comfortable with.

I mean, everything is so predictable. What is the input, and also what is the output for a function or a class method.

Apart from that, in this simple CRUD project, I tried to implement a new kind of code architecture inspired from my senior at my previous company and also from some blog readings.

Basically, the app code was divided into :

- `app.ts` (the main entry point)
- `config` : database config and others if exists
- `constants`: for every shareable constants
- `interfaces` : for typescript interface (loved it from C#)
- `models` : logic to handle SQL queries
- `controllers` : logic to handle requests and response
- `routes` : handle routes matching and controller
- and lastly, `sql` : the sql scripts used for queries

By writing the code in this architecture, I felt that the code is easily more testable compared to tutorial like code where everything is placed in the app.ts / app.js.

I also wrote some tests for the code. Currently only `models` code are tested. Later after adding more functionality, I'll write tests for the `controllers` part.
