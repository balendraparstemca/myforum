import React, { Component } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai'
import { RiReplyLine } from 'react-icons/ri'
import { Link } from "react-router-dom";
import $ from 'jquery';
import ScrollTopBtn from '../../components/common/ScrollTopBtn';

class PrivacyPolicy extends Component {
    state = {
        logo: require('../../assets/images/logo22.png'),
        content: `<p></p>
            <img src="page_001.jpg" alt="" style="height: ;width: " />
            <p ><span style="color: rgb(0,0,0);font-size: 20;font-family: Garamond;"><strong>Introduction</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">In this Privacy Policy, references to "you" means any person submitting any data or information to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">casualdesi.com 3 Guys Global Inc. ( Hereinafter for the sake of brevity referred to as 'Casual Desi',</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casualdesi.com ).</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">The term "Platform" used in this document refers to the website (being casualdesi.com), mobile apps</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">and / or any other services offered / to be offered by Casual Desi.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Privacy issues are a high priority for us at Casual Desi and we follow standard industry practices to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">maintain your personal information. Please read the following to learn more about our privacy policy.</span></p>
            <p ><span style="color: rgb(0,0,0);font-size: 20;font-family: Garamond;"><strong>Policy coverage</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">This Privacy policy covers Casual Desi's treatment of personally identifiable information that Casual</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Desi collects when you are on the Casual Desi site, and when you use Casual Desi's services. This</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">policy also covers Casual Desi's treatment of any personally identifiable information that Casual Desi's</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">business partners share with Casual Desi. This policy does not apply to the practices of companies</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">that Casual Desi does not own or control, or to people that Casual Desi does not employ or manage.</span></p>
            <p ><span style="color: rgb(0,0,0);font-size: 20;font-family: Garamond;"><strong>Use of information by Casual Desi</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi is one of India's largest digital Businesses and consumer brands that has transformed local</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">services ecosystem through a powerful need fulfillment and monetisation Platform. Your user identity</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">information will be kept confidential and will be used for our research, marketing, and strategic client</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">analysis objectives and other internal business purposes only.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">We do not sell or rent personal information except that in case you are a user of our need fulfillment</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">services, your personal information shall be shared with Casual Desi's customers / advertisers / need</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">providers and you shall be deemed to have given consent to the same.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">As is common in the industry, Casual Desi uses the technology of cookies and site log files to monitor</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">user registration, to recognise registered members when they revisit the site and to track site usage.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Our ability to identify you as a registered member allows us to customise the Casual Desi experience</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">and to protect your personal information based on your account settings.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Additionally, you may encounter "cookies" or other similar devices on this Platform that are placed by</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">third parties. We do not control the use of cookies by third parties.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Further, Casual Desi's customers / advertisers / need providers who are listed with us, may call you,</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">based on the query or enquiry that you make with us, enquiring about any:</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Need provider / product / service</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Product / service of any customer / advertiser / need provider</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Product / Service of any particular customer / advertiser / need provider</span></p>
            <p ><span style="color: rgb(0,0,0);font-size: 20;font-family: Garamond;"><strong>Visibility of public creative contributions</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">In addition to being a need fulfillment Platform, Casual Desi also provides a variety of Forums (as</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">defined in 'Terms of Use') for its members to express. Since this expression is linked to the member's</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">identity and the expression is in the public domain, the compilation of a member's creative</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">contributions to Casual Desi will be visible to all visitors of Casual Desi, whether or not they are</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">registered members of Casual Desi.</span></p>
            <p ><span style="color: rgb(0,0,0);font-size: 20;font-family: Garamond;"><strong>Sharing of information with third parties</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi takes your privacy very seriously. However, there may be times when we need to disclose</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">your personal information to third parties.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi reserves the right to share recordings of all phone calls made between: [a] any user and</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi; [b] any service provider and Casual Desi; [c] any user and service provider of Casual Desi</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">through UVN, to legal, accounting or other advisors that provide professional services and / or who</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">assists us in training, quality monitoring and quality enhancement of our services to the user and / or</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">service providers. You hereby grant your irrevocable consent to Casual Desi to share such call</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">recordings to third parties for such purposes. You further disclaim and / or abandon any right to sue</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi in relation to the same. Such third parties shall be bound by strict confidentiality</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">agreements which limit their use of such information.</span></p>
            <p ></p>
            <img src="page_002.jpg" alt="" style="height: ;width: " />
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi further reserves the right to share / sell some or all of your personal information with</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">another business entity in the event it plans to merge with, or be acquired by that business entity, re-</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">organize, amalgamate or restructure its business. If such a transaction occurs, that other business</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">entity or the new entity formed as a result of such transaction will be required to follow this Privacy</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Policy with respect to your personal information. You have no objection and are deemed to have</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">waived all objections in relation to the same for the fullest enjoyment of the services.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">The third parties with which Casual Desi shares your personal information shall be bound by strict</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">confidentiality agreements which limit their use of such information. In addition, Casual Desi may</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">share your information to send direct mailers or complimentary coupons / offers to a mailing agency</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">to process postal mailing. Again, such an agency would be bound by strict confidentiality agreements</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">that limit their use of such information</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Partnering with others</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi may partner with other online services to offer a combined service. Whenever we offer</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">such combined services, Casual Desi will make it clear who the partner is and it will be entirely up to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">you to use or not to use the service. Where any personal information is passed along to the partner</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">you will be informed prior to that sharing. Other than as set out in this Privacy Policy, we shall NOT</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">sell or disclose your personal data to third parties without obtaining your prior consent unless this is</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">necessary for the purposes set out in this Privacy Policy or unless we are required to do so by law.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Provision of aggregate demographic information to third parties:</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi reserves the right to provide aggregate demographic information of its member base to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">advertisers and others so as to attract pertinent advertisers to advertise on Casual Desi. We do not</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">shared personal information of individual users with advertisers.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Disclosures required by law</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">It is possible that we may need to disclose personal information when required by law. We will</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">disclose such information wherein we have a good-faith belief that it is necessary to comply with a</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">court order, ongoing judicial proceeding, or other legal process served on our company or to exercise</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">our legal rights or defend against legal claims.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">We may disclose personal information to law enforcement offices, third party rights owners, or others</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use or</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">a third party; or protect the rights, property or personal safety of our users or the general public.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Policy on abuse on Casual Desi</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi is committed to ensuring and enforcing a safe and friendly online community space for all</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">our members. To this effect, we have come up with a policy on abuse that we would like all our</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">members to be aware of. These rules govern the use of this Platform and its product / service</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">offerings and we would like all our members to cooperate in complying with these rules so that</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">everyone can have a pleasant experience.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Advertising and spamming</strong></span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Commercial messages or promotional messages from businesses or Organisations are not permitted</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">on the network. Casualdesi.com provides a Platform for its members to express themselves in the</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">form of articles, columns, opinions, comments, reviews, art and photos but the website must not be</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">used as a medium for marketing or selling to our members.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">No advertising or promotion is allowed except where it is for an event, publication or similar item that</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">has direct relevance to the subject of discussion and is non-commercial in nature. Information about</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">locating and sharing knowledge and expertise is welcomed, but must have relevance to the topic on</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">which an opinion is expressed or a discussion is initiated.</span></p>
            <p ></p>
            <img src="page_003.jpg" alt="" style="height: ;width: " />
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Do not post chain letters, promote pyramid schemes or recruit members for any network marketing</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">or multilevel marketing businesses.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Do not recruit members to join another website forum or chat group, whether personal or otherwise.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">if you have a suggestion for a new forum, please contact us or send your queries to member relations.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Casualdesi.com encourages healthy discussion on the topics that members contribute to in forums and</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">where relevant, members are allowed to post links to their content. However, overt promotion of, or</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">inappropriate links to other known commercial websites on any forum are not permitted and will be</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">removed. If you are unsure whether a link or a posting is allowed, please send your queries to member</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">relations. The definition of an appropriate link is one that is relevant to both the posting and the</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">forum topic. A commercial site is considered as one which promotes a product or service for a price</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">or for other consideration that suggests it is a for-profit business.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Copyrighted material</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Uploading copies of copyrighted material as a whole or in part on Casualdesi.com without explicit</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">permission from the copyright owner shall be deemed to infringe on the copyright and this applies to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">materials such as text, images, music, movies, games, and other software in digital and analog format.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Casualdesi.com reserves the right to immediately delete such material without prior permission /</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">consultation from the member. If you suspect that an image submitted to Casualdesi.com is copyright</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">protected and has been used fraudulently, please contact us immediately or send us an email to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">member relations.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Safety guidelines</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">The Platform is always reaching out to a wider audience by showcasing the best of our member</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">contributions. However, in doing so, we will not allow to be uploaded anything on the site that we</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">think could be potentially endangering or is inflammatory or embarrassing to our members. It also</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">helps members to be aware of certain things in the interest of their safety.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">All members are responsible for the safety of their personal information. We recommend that</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">members do not disclose their names, addresses, email addresses, telephone numbers or other</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">personal information online.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">All members need to be aware that when they upload their photos on the Platform, the photos are not</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">only visible to the entire internet community but can also be downloaded, since any image that can be</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">displayed on a computer screen can be saved by the person viewing it. It is technically not possible to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">prevent this and hence Casual Desi cannot be held liable in such cases. If you are worried about</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">someone else viewing or saving your images then please do not submit them.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Do not post chain letters, promote pyramid schemes or recruit members for any network marketing</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">or multilevel marketing businesses.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Do not recruit members to join another website forum or chat group, whether personal or otherwise.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">If you have a suggestion for a new forum, please contact us or send your queries to member relations.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi encourages healthy discussion on the topics that members contribute to in forums and</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">where relevant, members are allowed to post links to their content. However, overt promotion of, or</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">inappropriate links to other known commercial websites on any forum are not permitted and will be</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">removed. If you are unsure whether a link or a posting is allowed, please send your queries to member</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">relations. The definition of an appropriate link is one that is relevant to both the posting and the</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">forum topic. A commercial site is considered as one which promotes a product or service for a price</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">or for other consideration that suggests it is a for-profit business.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Legalities</strong></span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">All members are reminded that they may be held legally accountable for what they say or do online. In</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">particular, members may be held liable for any defamatory comments, threats and / or untrue</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">statements or other illegal and fraudulent claims made by them.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Casual Desi does not endorse the opinions expressed by its members.</span></p>
            <p ></p>
            <img src="page_004.jpg" alt="" style="height: ;width: " />
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">If any member fails to observe the above rules of conduct at any time, Casual Desi reserves the right</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">to terminate the membership of the member and / or delete all their contributions (either temporarily</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">or permanently) from the site, depending on the nature and severity of the breach and without prior</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">warning or consent of the member.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">Registration as a member of this Platform at any time past or present and use of the Platform and all</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">its product / service offerings will be taken as acceptance of the above rules of conduct. Casual Desi's</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">decision on all matters is final and binding on its members. Legal jurisdiction for all disputes is the</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Courts of United States of America.</span></p>
            <p >&nbsp;&nbsp;<span style="color: rgb(0,0,0);font-family: Garamond;">The Platform endeavours to foster a vibrant local service need platform that serves millions of users</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">and businesses. We are here to serve our members 24x7 and use all feedback to refine and improve</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">the online experience for our members. You can reach TEAM CASUAL DESI anytime by writing to</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">ears@CasualDesi.com and we will respond to you in a timely manner. We hope you have an enjoyable</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">and rewarding experience on the Platform.</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>Grievance Officer</strong></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">In keeping with the provisions prescribed in the Regulations and Rules made there under and as</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">amended from time to time, the name and contact details of the Grievance Officer are provided</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">below:</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">By Postal Mail:</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><em>The Grievance Officer,</em></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><em>Casualdesi.com</em></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><em>3 Guys Global Inc.</em></span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">5605 MacAurthur Blvd,</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">Suite 740, Irving,</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">TX 75038, USA</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;">By Email:</span></p>
            <p ><span style="color: rgb(0,0,0);font-family: Garamond;"><strong>- legal@CasualDesi.com</strong></span>&nbsp;</p>
             `
    }
    componentDidMount() {
        $(window).on('scroll', function () {
            //header fixed animation and control
            if ($(window).scrollTop() > 200) {
                $('.header-menu-wrapper').addClass('header-fixed');
            } else {
                $('.header-menu-wrapper').removeClass('header-fixed');
            }
        });
    }

    createMarkup = () => {
        return { __html: this.state.content };
    }

    render() {
        return (<>
            <main className="invoice-page">
                <section className="invoice-area padding-top-60px">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <div className="invoice-content">
                                    <div className="invoice-title" >
                                        <h2 className="widget-title text-center mb-5">Privacy and Policy</h2>
                                    </div>
                                    <div className="invoice-item" style={{fontSize:'19px'}} dangerouslySetInnerHTML={this.createMarkup()}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="btn-box mt-4  mb-5 text-center">
                                    <a href="javascript:window.print()" className="theme-btn">
                                        <span className="la"><AiOutlinePrinter /></span> print this privacy policy
                                    </a>
                                    <Link to="/" className="theme-btn ml-2  mt-4">
                                        <span className="la"><RiReplyLine /></span> back to home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
              <ScrollTopBtn/></>
        );
    }
}

export default PrivacyPolicy;