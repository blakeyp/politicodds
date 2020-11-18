## Politicodds backend
JSON REST API serving betting data for politics events, queried from the Betfair Exchange

- `/events` list of (politics) events/categories
- `/events/{id}/markets` list of currently open markets for the given event (id)
- `/markets/{id}/odds` list of best available runner prices for the given market (id) in decimal format

### Project structure
```
src
│   server.ts                    # server entry point
│   app.ts                       # Express setup
│   config.ts                    # config vars
│   router.ts                    # route definitions
└───controllers                  # route controllers
│   │   markets.ts
│   │   runners.ts
│   │   odds.ts
|   |   ...
└───domain                       # business domain types/logic
│   │   BettingClient.ts         # interface for generic client to a betting API
│   │   Odds.ts                  # value object to represent odds incl. conversion logic
│   │   ...
└───services                     # services behind each controller
│   │   index.ts                 # singleton export 'barrel'
│   │   MarketsService.ts
│   │   ...
└───external                     # external/third-party services
│   └───http
│       │   HttpClient.ts        # client for making http requests
│       │   ...
│   └───betfair
│       │   BetfairClient.ts     # implementation of BettingClient for Betfair API
│       │   ...
```

### Coding patterns

#### Export barrel
Each `index.ts` defines a 'barrel' module<sup>[1](#barrel)</sup> which instantiates and re-exports its directory's classes as singleton instances for external use.
This aids maintaining singletons with dependency injection and makes imports cleaner:
```
import { serviceA, serviceB } from '../services'
```
rather than:
```
import serviceA from '../services/serviceA'
import serviceB from '../services/serviceB'
```

#### Dependency injection (DI)
To aid decoupling and ease testing, class dependencies are injected via each constructor.
This is done on object instantiation in each export barrel, avoiding the need for a dedicated "IoC container"<sup>[2](#ioc)</sup> to handle DI.

#### Dependency Inversion Principle
The 'Dependency *Inversion* Principle'<sup>[3](#dip)</sup>, closely related to DI, is followed where appropriate.

For example, each controller service (a 'higher-level' module) depends on the betting client (a 'lower-level' module) which fetches data from a third-party betting API.
Since the controller service need not care about the implementation of the betting client or which betting API it's using, it depends on an interface rather than a concretion.
This interface, *BettingClient*, owned by the controller service, defines the methods which it needs any implementing client to support.
*BetfairClient*, a client for the Betfair API, implements the interface and is injected in each controller service via DI.

In sum this means that:
- the high-level module owns and depends only on an abstraction (interface) of the lower-level module
- a mock implementation of the interface can be easily built (and injected) to aid testing
- *BetfairClient* can be swapped for any alternative third-party client as long as it implements the interface

We say the dependency has been 'inverted', from the controller depending on the *BetfairClient* implementation to the controller depending on an interface between itself and the implementation:
```
SomeController -> BetfairClient (impl)
SomeController -> BettingClient (interface) <- BetfairClient (impl)
```

### Value objects
Value objects in *Domain Driven Design* are "small objects that represent simple entities whose equality is not based on identity". They can be thought of as an extension of primitive types such as number or string and can be used to neatly encapsulate domain logic in a single place<sup>[4](#vos)</sup>. For example, here an `Odds` value object is used to represent an odds value and encapsulate the conversion logic, between different formats decimal/fractional/percent. This prevents this kind of domain logic from leaking into the controller/infrastructure level code where it doesn't belong.

#### References
1. <a name="barrel"></a> https://basarat.gitbook.io/typescript/main-1/barrel
2. <a name="ioc"></a> https://khalilstemmler.com/articles/software-design-architecture/coding-without-di-container/
3. <a name="dip"></a> https://stackoverflow.com/questions/62539/what-is-the-dependency-inversion-principle-and-why-is-it-important
4. <a name="vos"></a> https://medium.com/swlh/value-objects-to-the-rescue-28c563ad97c6
