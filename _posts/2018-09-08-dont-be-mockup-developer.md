---
layout: post
title: Don't be a mockup developer
author: mateusz
tags: ['android', 'ios', 'programming practices']
comments: true
hidden: true
image: /images/react-native-custom-ios-build-configurations/build-configurations.png
---

Many times as a mobile developer I had to work on apps without the API that was crucial for the feature I was implementing. Either the backend was developed by another team that was not entirely in sync with us or our backend team had no chance to implement those endpoints earlier. For this reason, I was not able to satisfy the Definition of Done ([follow this link to learn more about DoD]) but it does not mean that I have implemented the UI only.

## Ninety-ninety rule

One might think that without the API work on certain features can only be limited to building the UI. The main problem with such approach is that we live in a false belief that we have done everything we could and we mislead the whole team that the feature is "almost ready". When the API is done we realise that there is still plenty of work to do and we need much more time to finish the feature.

[Ninety-ninety rule](https://en.wikipedia.org/wiki/Ninety-ninety_rule) says that the project is finished in 90% for the 90% of time. Even though there is some true in this humorous aphorism, if we create a false belief that the application is almost ready, we obscure the project progress.

## What can I do?

Co mogę zrobić poza przygotowaniem UI?
- Fake call do dowolnego serwisu/mocka? - przykłady serwisów/mocka, obsługa udanego połączenia pozwoli chociażby upewnić się że nie aktualizujemy UI z background wątka
- Sprawdzenie dostępu do internetu przed synchronicznym callem
- Dodanie loadera do synchronicznego calla
- Obsługa i logowanie błędów
- Obsługa braku danych (placeholder)
- Testy poszczególnych stanów UI

## You can do more

Czy mogę zrobić coś jeszcze?
- jeżeli backend jest implementowany przez nas, to możemy zaproponować backend developerowi strukturę requestów/responsów (json) oraz przykładowe kody błędów
- pozwoli to lepiej zrozumieć problem oraz wszystkie stany w jakich może znaleźć się ekran/aplikacja
- a backend developer napewno doceni ułatwienie w postaci gotowych struktur danych

## Do your best

- korzyści
- do mockupów są duże tańsze i szybsze narzędzia

And if we create only the UI, we are not better than mockup which is faster and cheaper.
