---
author: izabela
tags:
  - business strategy
date: 2025-12-11T08:06:02.427Z
meaningfullyUpdatedAt: 2025-12-11T08:06:02.458Z
slug: digital-product-passport-manufacturers
title: What Digital Product Passport Mean for Global 2000 Manufacturers
layout: post
image: /images/blog_dpp_cover.png
hidden: false
comments: false
published: true
language: en
---
**The European Union has shifted the burden of proof of sustainability from the marketing department to the IT department. Printing a green leaf on the packaging won’t be enough soon. You’ll need to prove it with data that every consumer will get access to. The regulation demands a Digital Product Passport (DPP) for nearly every physical good placed on the EU market.**

<div className="image">![Digital Product Passport - mockup example.](/images/gemini_generated_image_c361ryc361ryc361.png "Digital Product Passport - mockup example.")</div>

<center>AI-generated conceptual image.</center>

## What is a Digital Product Passport (DPP)?

A [Digital Product Passport (DPP)](https://data.europa.eu/en/news-events/news/eus-digital-product-passport-advancing-transparency-and-sustainability) is a digital record that acts as a "twin" to a physical product, securely accessible via a scan (QR code, NFC, or RFID).

It shows product's entire lifecycle, including:

* **Origin & Composition**: Where materials came from and what the product is made of (e.g., % of recycled content).  
* **Sustainability**: Carbon footprint and environmental impact.  
* **Circularity**: Instructions for repair, dismantling, and recycling.

## Digital product passport compliance deadlines

If your deadline is 2027, you might already be behind schedule.

| **Industry**             | **Hard Compliance Deadline** | **The "Data Reality"**                                                              |
| ------------------------ | ---------------------------- | ----------------------------------------------------------------------------------- |
| **Batteries**            | Feb 18, 2027                 | *Critical.* Applies to all EV, LMT (e-bike), and industrial batteries >2kWh.        |
| **Textiles & Apparel**   | Mid-2027 / 2028              | *High Volume.* Requires item-level traceability (likely RFID) for millions of SKUs. |
| **Iron & Steel**         | ~Mid-2027                    | *Complex.* Tracking "scrap input" vs. "virgin ore" ratios across blast furnaces.    |
| **Aluminum**             | ~2027                        | Treated as a priority intermediate product alongside steel.                         |
| **Tyres**                | 2027                         | Moving from a sticker label to a full digital lifecycle record.                     |
| **Furniture**            | 2028 / 2029                  | Complicated by multi-material composition (wood, foam, metal, fabric).              |
| **Consumer Electronics** | 2029                         | Focus on "Right to Repair" metrics and critical raw material recovery.              |

## What you actually have to build

You probably can’t just use a generic SaaS portal. Why? Because the data requirements for every industry vary and you need custom software that will answer to that. **Custom digital solutions don't just "generate a QR code”**, they dive deeper. Check some examples below.

### DPP for For Batteries

**The challenge**: Dynamic health monitoring.

**Required data**:

* **Static**: Manufacturing date, chemistry type (Li-ion, LFP), and hazardous substances.
* **Dynamic**: State of Health (SoH) data, expected cycle life, and "carbon footprint" calculated specifically for that manufacturing batch.

**The dev angle**: You need an API that can pull real-time BMS (Battery Management System) data and serialize it into the passport.

More information: [https://circulareconomy.europa.eu](https://circulareconomy.europa.eu/platform/sites/default/files/2024-03/1qp5rxiZ-CEPS-InDepthAnalysis-2024-05_Implementing-the-EU-digital-battery-passport.pdf)

### DPP for Textiles

**The challenge**: Granularity.

**Required data**: Fiber composition (e.g., 60% Recycled Polyester, 40% Virgin Cotton), country of origin for each weaving/stitching stage, and presence of microplastics.

**The dev angle**: This is an RFID game. You cannot scan QR codes on 50,000 t-shirts manually. You need a solution that integrates with UHF RFID readers (like those from Zebra Technologies) to associate a unique digital ID with a physical garment in milliseconds.

## The "build vs. buy" reality check: Why enterprise needs custom architecture

### Reason 1: Adjusting to legacy code

SaaS platforms assume a "clean" world. They are built for modern environments, expecting your data to be neatly organized in cloud-native systems accessible via standard RESTful APIs.

**The reality**: Your enterprise data landscape is likely a stack built over decades. Are you juggling a 10-year-old warehouse system, a heavily customized on-premise ERP, and multiple siloed product lifecycle management (PLM) tools inherited from recent corporate acquisitions?

**The problem**: Generic SaaS tools hit a wall when facing this complexity. They cannot natively interpret proprietary database schemas, heavily modified logic (like custom stored procedures), or the "dirty data" discrepancies between your US and European divisions (e.g., metric vs. imperial inconsistencies). If the SaaS connector expects Field A, but your system uses Custom Field B, the integration fails.

**The custom solution**: A Bright Inventions we integrate your legacy or complex infrastructure with the modern web. We don't ask your systems to change, our goal is to maintain backward compatibility if needed. We extract, clean, and normalize the data before it ever hits the passport. This allows you to achieve EU compliance without triggering a multi-million dollar infrastructure overhaul.

### Reason 2: Less reliance on third-parties

When you sign up for a SaaS DPP vendor, you are effectively uploading your entire supply chain map – your Tier 2 suppliers, your exact chemical formulations, and your pricing structures – into a third-party's cloud.

**The risk**: You are renting your own data. If that vendor pivots, gets acquired by a competitor, or hikes their API pricing by 400%, you are held hostage. You cannot easily "export" a live, dynamic passport history to a new provider.

**The custom solution**: By building a custom solution you retain 100% data sovereignty. You own the graph database. You own the API keys. You decide exactly what is public (compliance data) and what is private (IP/Formulations), with no risk of a vendor peeking into your trade secrets.

### Reason 3: Turning Compliance into Customer Experience (CX)

A standard "compliance" passport is a boring static page that checks a box for the EU regulator. It is a cost center.

<div className="image">![Digital Product Passport - mockup example.](/images/gemini_generated_image_v3uox9v3uox9v3uo.png "Digital Product Passport - mockup example.")</div>

<center>AI-generated conceptual image.</center>

**The opportunity**: A custom passport is a post-purchase engagement channel.

**The custom solution**: Because we control the frontend experience (PWA or Native App), we can turn the "scan" into a revenue generator:

**One-click resale**: "Scan your jacket's tag to list it on our second-hand marketplace instantly."

**Predictive maintenance**: "Scan your e-bike battery to see its current health and book a service appointment."

**Authentication**: Luxury brands can use the passport to prove provenance, killing the counterfeit market.

**Loyalty**: "Scan your product to register the warranty and earn 500 points."

**The verdict:** **Don't build a digital passport just to avoid a fine. Build a digital passport to own your data and own your customer.**

## Relying on the right hardware

When it comes to supply chain visibility, Zebra Technologies is the undisputed global leader. From ruggedized mobile computers and barcode scanners to RFID readers and industrial printers, Zebra hardware powers the operations of the world’s largest manufacturers and logistics companies.

However, hardware is only half the equation. **As [Zebra Registered ISV Partner](https://www.zebra.com/pl/pl/partners/partner-application-locator/partner-details.html?id=0016S00003NQa9WQAT&viewType=nav) we possess deep experience in building custom applications specifically for Zebra devices.**

**Native optimization**: We build native solutions that fully leverage Zebra’s specialized scanning engines and rugged capabilities.

**Workflow integration**: We understand the specific UX constraints of a factory worker wearing gloves or a logistics driver in the rain. We design interfaces that are fast, high-contrast, and error-proof.

**Seamless connectivity**: We ensure that the data captured on the floor – whether via barcode or RFID –syncs instantly with your central middleware, ensuring your Digital Product Passport is updated in real-time.

By combining Zebra’s world-class durability with our custom software logic, we bridge the gap between the physical product and its digital twin.

## Does your company need Digital Product Passport solution?

Let's talk about your operational challenges. [Contact us](https://brightinventions.pl/start-project/) to book a meeting in 1 business day!