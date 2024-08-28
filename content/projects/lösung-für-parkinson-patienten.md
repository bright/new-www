---
team_members:
  - michal
our_service:
  - MVP-Entwicklung Agentur
layout: project
project_id: solution-parkinson-german
title: Lösung für Parkinson-Patienten
image: /images/app_for_parkinson_patients1.png
description: Ein persönliches digitales Tagebuch für Parkinson-Patienten. Mit
  der App können Benutzer Ihre Symptome aufzeichnen und die Einnahme
  verschriebener Medikamente verfolgen.
hero_image: /images/case_study_app_parkinson_patients_app.png
Hero Image_alt: Lösung für Parkinson-Patienten
social_media_previev: /images/fb_preview_case_study_parkinson_app_de.png
social_media_previev_alt: Lösung für Parkinson-Patienten
bar_achievements:
  - number: "2"
    label: iOS uns Android Apps
  - number: "3"
    label: Monate bis zur MVP-Einführung
  - number: "5"
    label: Hauptfunktionen
tags:
  - mobile app
  - MVP
  - customized software
  - eHealth
title_team: team
title_case_study: weitere von uns entwickelte Anwendungen
title_contact: in 48 Stunden eine kostenlose Beratung buchen
description_contact: Erzählen Sie uns mehr über Ihr Projekt oder Ihre Idee für
  eine App. Füllen Sie das Formular aus.
order: 99
slug: losung-fur-parkinson-patienten
show_team: false
show_case_study: true
show on homepage: false
published: false
work_in_progress: false
language: de
---
![App for Parkinson's Patients](../../static/images/app_for_parkinson_patients2.png)

*Es ist kein wirklich implementiertes Design. Es handelt sich um ein Mockup-Beispiel, das zum Zweck der Fallstudie erstellt wurde.*

<TitleWithIcon sectionTitle="von Bright Inventions entwickelte Hauptfunktionen:" titleIcon="/images/main_features_icon.png" titleIconAlt="features" />

* Verfolgung der körperlichen Reaktion auf Standard- und experimentelle Therapien
  Medikamentenerinnerung
* Zugänglichkeit – eine einfache Möglichkeit, medizinische Informationen für Patienten mit Bewegungsstörungen hinzuzufügen
* Erweiterte Statistiken und Berichte für Ärzte
* Gamifizierung der App

<TitleWithIcon sectionTitle="fähigkeiten" titleIcon="/images/skills.svg" titleIconAlt="fähigkeiten" />

<Gallery images='[{"src":"/images/swift_icon_stack.svg","alt":"Swift"},{"src":"/images/kotlin_new_stack_logo.svg","alt":"Kotlin"},{"src":"/images/node_stack_logo_update.svg","alt":"Node.js"},{"src":"/images/new_typescript_logo_stack.png","alt":"TypeScript"},{"src":"/images/postgresql_logo_stack.png","alt":"PostgreSQL"},{"src":"/images/aws.png","alt":"AWS"}]' />

iOS: Swift, RxSwift, Alamofire

Android: Kotlin, RxKotlin, Dagger, Retrofit

Backend: Node.js, Typescript, PostgreSQL, AWS Services

<TitleWithIcon sectionTitle="über die App für Parkinson-Patienten" titleIcon="/images/three_flags.svg" titleIconAlt="über die App für Parkinson-Patienten" />

Das Leben mit einer chronischen Krankheit wie Parkinson erfordert dem Patienten viele Veränderungen im Lebensstil auf. Für diejenigen, die gegen die Krankheit kämpfen, ist es von entscheidender Bedeutung, dass sie eine Möglichkeit haben, ihre allgemeinen Vitalwerte, die Einnahme von Medikamenten oder alle Symptome, auf die sie ihren Arzt aufmerksam machen müssen, leicht zu verfolgen.

<TitleWithIcon sectionTitle="ziel" titleIcon="/images/goal_title_section.png" titleIconAlt="ziel" />

Unser langjähriger Kunde (eine Produktdesignagentur und Projektinkubator in der Frühphase) wandte sich mit einer umsetzungsfertigen Idee seiner Kunden für eine App an uns. Ziel des Projekts war die Entwicklung einer mobilen App, die den Alltag von Parkinson-Patienten vereinfachen wird.

Bevor sie sich an uns wandten, hatten unsere Kunden bereits ein High-Fidelity-Wireframe der Benutzeroberfläche entworfen. Jetzt brauchten sie einen Technologiepartner, der den Softwareentwicklungsprozess übernimmt.

Und so wurde Bright Inventions mit der Umsetzung des gesamten Systems betraut – der Entwicklung zweier Apps (iOS und Android) sowie des gesamten Backends.

![App for Parkinson's Patients](../../static/images/app_for_parkinson_patients3.png)

*Es ist kein wirklich implementiertes Design. Es handelt sich um ein Mockup-Beispiel, das zum Zweck der Fallstudie erstellt wurde.*

<TitleWithIcon sectionTitle="ablauf der App-Entwicklung" titleIcon="/images/gearwheel.svg" titleIconAlt="ablauf der App-Entwicklung" />

Es gab mehrere Herausforderungen, die wir angehen mussten. Erstens musste die App für Patienten mit Tremor oder anderen Bewegungsstörungen geeignet sein. Da ältere Menschen die Mehrheit der an Parkinson erkrankten Patienten ausmachen, musste die Benutzeroberfläche gut lesbar und äußerst intuitiv sein um die Wahrscheinlichkeit von Fehlern zu minimieren. Sollte es jedoch zu einer versehentlichen Eingabe kommen, muss die Schnittstelle auch die Möglichkeit bieten, die Aktion rückgängig zu machen.

![App for Parkinson's Patients](../../static/images/app_for_parkinson_patients1.png)

*Es ist kein wirklich implementiertes Design. Es handelt sich um ein Mockup-Beispiel, das zum Zweck der Fallstudie erstellt wurde.*

Während der Softwareentwicklung sind unserem Team viele Funktionen in der GUI aufgefallen, die für eine solche Benutzergruppe zu komplex waren. Wir haben dann jeweils eine einfachere Lösung vorgeschlagen, die positiv aufgenommen wurde und der Auftraggeber hat das grüne Licht gegeben.

Die größte Herausforderung bestand jedoch darin, die höchsten Sicherheits- und Datenschutzstandards zum Schutz der Benutzer zu erfüllen. Aufgrund ihrer medizinischen Natur speicherte die App sehr empfindliche Daten über die Gesundheit der Patienten (neben Informationen zu Schmerzen oder Zittern ermöglichte sie den Benutzern auch, ihren sexuellen Antrieb oder ihre Spielneigung zu notieren).

Aus diesem Grund hat sich Bright Inventions entschieden, die Datenbank in zwei Teile aufzuteilen, die jeweils an einem anderen physischen Standort der AWS-Dienste gespeichert sind.

Die erste Datenbank hat die grundlegende Benutzerdaten wie Name oder E-Mail-Adresse gespeichert. Die zweite Datenbank hat empfindliche Informationen enthalten, einschließlich der Einnahme von Medikamenten oder körperlichen Symptomen und Empfindungen. Durch diese Entscheidung haben wir sichergestellt, dass die angreifende Seite nicht in der Lage wäre, auf alle Informationen zuzugreifen. Auf diese Weise gab es praktisch keine Chance, Symptome oder Medikamenteneinnahme bestimmten Patientennamen zuzuordnen.

<TitleWithIcon sectionTitle="ergebnis der Zusammenarbeit" titleIcon="/images/results_icon_title_small.png" titleIconAlt="ergebnis der Zusammenarbeit" />

Insgesamt hat unsere Projektarbeit 5 Monate gedauert und bestand aus zwei Etappen. Die erste Phase endete mit dem Launch des MVP (Entwicklung dauerte 3 Monate). Die zweite Phase unserer Zusammenarbeit, die zu mehreren Iterationen des Systems geführt hat, erstreckte sich über einen Zeitraum von weiteren 2 Monaten.

Nach der Entscheidung der Partei, der die App gehörte (also des Kunden unseres Kunden), wurde das Projekt auf Eis gelegt. Im Moment sind die nächsten Schritte nicht bekannt und die App steht nicht öffentlich zum Download bereit.

![App for Parkinson's Patients](../../static/images/app_for_parkinson_patients4.png)

*Es ist kein wirklich implementiertes Design. Es handelt sich um ein Mockup-Beispiel, das zum Zweck der Fallstudie erstellt wurde.*