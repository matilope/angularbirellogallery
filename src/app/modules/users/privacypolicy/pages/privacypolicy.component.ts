import { Component } from '@angular/core';
import { Legal } from '@core/models/legal';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss'],
})
export class PrivacypolicyComponent {
  public privacys: Legal[];

  constructor(private titleService: Title, private metaService: Meta) {
    this.privacys = [
      new Legal(
        'SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?',
        'When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.',
        'When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.',
        'Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.'
      ),
      new Legal(
        'SECTION 2 - CONSENT',
        'How do you get my consent?',
        'When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.',
        'If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.'
      ),
      new Legal(
        'SECTION 3 - DISCLOSURE',
        'We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.'
      ),
      new Legal(
        'SECTION 4 - THIRD-PARTY SERVICES',
        'In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.',
        'However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions. For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.',
        'In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.',
        'As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.',
        'Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.',
        'Links: When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.'
      ),
      new Legal(
        'SECTION 5 - SECURITY',
        'To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.'
      ),
      new Legal(
        'SECTION 6 - AGE OF CONSENT',
        'By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.'
      ),
      new Legal(
        'SECTION 7 - CHANGES TO THIS PRIVACY POLICY',
        'We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.'
      ),
    ];
    this.titleService.setTitle('Privacy Policy | Birello Gallery');
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Privacy Policy',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Read our privacy policy',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.birellogallery.com/privacypolicy',
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Privacy policy',
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: 'Read our privacy policy',
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: 'https://www.birellogallery.com/privacypolicy',
    });
  }
}