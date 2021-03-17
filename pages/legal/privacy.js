import React from 'react';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const StaticContent = () => {
  try {
    if (typeof window !== 'undefined') {
      window.fcWidget.hide();
    }
  } catch (er) {
    console.log(er);
  }
  return (
    <Layout>
      <SEO title="Privacy" />
      <section className="static-content-wrapper" style={{ padding: '0 10px 45px 10px' }}>
        <div className="container">
          <div className="section-title">
            <h2 className="title">PRIVACY POLICY</h2>
          </div>
          <div className="static-page-desc">
            <h4>
              This document is an electronic record in terms of the Information
              Technology Act, 2000 and rules framed thereunder as applicable. This
              electronic record is generated by a computer system and does not
              require any physical or digital signatures.
            </h4>
            <p>
              TM Investment Technologies Pvt Ltd, a private limited company,
              incorporated under the Indian Companies Act, 2013, allotted
              Corporate Identification Number (CIN) U74999MH2016PTC273604 and
              having its registered office at 10, Prudential Ground Floor,
              Hiranandani Gardens, Powai, Mumbai Bandra Suburban - 400076,
              Maharashtra, India and operating under its trade name ‘Tejimandi’,
              (hereinafter referred to as ‘Tejimandi’) is the owner of the website
              with domain name http://blog.tejimandi.com/privacy and Tejimandi application
              (hereinafter referred to as the ‘Tejimandi Platforms’).
            </p>
            <p>
              Tejimandi is concerned about the privacy of the Users who access,
              browse, use and transmit content on the Tejimandi Platforms. This
              Privacy Policy is for the purpose of acquainting the Users with the
              manner in which Tejimandi collects, uses and discloses the Users’
              information collected through the Tejimandi Platforms.
            </p>
            <p>Please read the following terms of Tejimandi Privacy Policy:</p>
          </div>
          <div className="static-content">
            <h4>DEFINITIONS:</h4>
            <p>
              <strong>Cookie</strong>
              {' '}
              shall mean a small text file that is stored
              on the User’s computer that will enable Tejimandi to recognize the User
              when the User visits the Tejimandi Platforms. A cookie also enables
              Tejimandi to store the User’s preferences and settings, enhance the
              User’s experience by delivering content and advertising suited to
              the User’s interests, perform research and analytics, track usage
              and activity on the Tejimandi Platforms, and assist with security and
              administrative functions.
            </p>
            <p>
              <strong>Force Majeure Event</strong>
              {' '}
              shall mean any event that is
              beyond the reasonable control of Tejimandi and shall include, without
              limitation, sabotage, fire, flood, explosion, acts of God, civil
              commotion, strikes or industrial action of any kind, riots,
              insurrection, war, acts of government, computer hacking,
              unauthorized access to computer data and storage device, computer
              crashes, breach of security and encryption, etc.
            </p>
            <p>
              <strong>Personally Identifiable Information</strong>
              {' '}
              shall mean the
              data or information that is personal to a User and allows persons
              other than the User to identify the User personally from such data
              or information; information that personally identifies or can be
              used to identify, contact or locate the person, to whom such
              information belongs including, including without limitation, log in
              name, email address, Facebook account details, Google account
              details, password and location details which will likely be
              collected at the time of User’s registration on the Tejimandi
              Platforms.
            </p>
            <p>
              <strong>Pixel Tag/ Web Beacon/ Clear GIF</strong>
              {' '}
              shall mean a tiny
              graphic with a unique identifier, embedded invisibly on a webpage
              (or an online ad or email), and is used to count or track things
              like activity on a webpage or ad impressions or clicks, as well as
              to access cookies stored on Users’ computers or other devices.
            </p>
            <p>
              <strong>Privacy Policy</strong>
              {' '}
              shall mean this Privacy Policy.
            </p>
            <p>
              <strong>User</strong>
              shall mean any person who accesses or avails the Tejimandi Platforms
              for the purpose of browsing, viewing, creating, posting, publishing,
              hosting, displaying, sharing, uploading or otherwise transmitting
              its content on the Tejimandi Platforms.
            </p>
            <p>
              Capitalized words used in the Privacy Policy shall have the meaning
              ascribed to them in the Terms and Conditions of Use.
            </p>
            <h4>GENERAL TERMS:</h4>
            <p>
              The User hereby acknowledges and agrees that the Privacy Policy is
              subject to changes without express and specific intimation and the
              Users shall be required to review the Privacy Policy regularly. The
              continued use of the Tejimandi Platforms expresses the User’s consent
              to the updated Privacy Policy.
            </p>
            <p>
              The protection and security of the User’s Personally Identifiable
              Information is one of Tejimandi’s foremost concerns. The Privacy Policy
              discloses Tejimandi’s practice with respect to the information
              collected from the User on the Tejimandi Platforms.
            </p>
            <p>
              By using the Tejimandi Platforms the User agrees to accept the terms of
              the Privacy Policy as well as Tejimandi’s Terms & Conditions of Use as
              provided for at www.Tejimandi.app/legal/privacy. By accessing or using
              the Tejimandi Platforms, the User expressly consents to Tejimandi’s use
              and disclosure of the Users’ personal information in the manner
              described in the Privacy Policy.
            </p>
            <p>
              The Users are hereby informed that in accordance with Rule 5 of the
              Information Technology (Intermediary Guidelines) Rules, 2011, in
              case of any non-compliance with the Terms & Conditions of Use and
              the Privacy Policy, Tejimandi reserves it’s right to immediately
              terminate access or usage rights of the Users.
            </p>
            <p>
              By using the Tejimandi Platforms, the User agrees to the terms of the
              Privacy Policy. If the User does not agree with the terms of the
              Privacy Policy, the User is requested to stop from proceeding
              further and to cease using the Tejimandi Platforms.
            </p>
            <p>
              The Privacy Policy shall at all times be read along with the Terms &
              Conditions of Use of the Tejimandi Platforms. Unless stated otherwise,
              the Privacy Policy applies to all information that Tejimandi has about
              the User and User’s account.
            </p>
            <h4>
              COLLECTION OF PERSONALLY IDENTIFIABLE INFORMATION AND OTHER
              INFORMATION:
            </h4>
            <p>
              Tejimandi will collect and store Personally Identifiable Information
              provided by the Users from time to time while registering and/ or
              using the Tejimandi Platforms. Tejimandi will only collect such Personally
              Identifiable Information from the Users, which it considers
              necessary for facilitating the use of the Tejimandi Platforms and for
              the purpose of improving Tejimandi’s services towards its Users.
            </p>
            <p>
              Tejimandi may obtain certain information based on the User’s activities
              such as the User’s browsing trends, the User’s preferences and
              interest, etc.. Tejimandi may also collect other general information
              such as the User’s comments provided on the Tejimandi Platforms and the
              User’s correspondence with Tejimandi;
            </p>
            <p>
              Upon request by the User, Tejimandi will remove / block the User’s
              Personally Identifiable Information from Tejimandi’s database, thereby
              canceling the User’s registration. However, the User’s information
              may remain stored in archive on the servers even after the deletion
              or the termination of the User’s account.
            </p>
            <p>
              The User acknowledges that User Content and other general
              information (excluding Personally Identifiable Information),
              including without limitation, username, videos, GIFs, comments shall
              be available and accessible at all times to the other Users of
              Tejimandi.
            </p>
            <p>
              Tejimandi shall not be responsible for the authenticity of the
              information provided by the User.
            </p>
            <h4>TRACKING OF INFORMATION:</h4>
            <p>
              Tejimandi may use Cookies, Pixel Tags, Web Beacons, flash cookies and
              similar files or technologies to collect, track and store
              information based on the User’s use of the Tejimandi Platforms. Tejimandi
              uses Pixel Tags to measure the popularity of pages, people and
              hastags. Tejimandi may use Web Beacons in e-mail messages or
              newsletters to determine whether the message has been opened and for
              other analytics.
            </p>
            <p>
              Most browsers are set to automatically allow Cookies. Please note it
              may be possible to disable some (but not all) Cookies through the
              browser settings on the User’s electronic device, but doing so may
              interfere with certain functionality on the Tejimandi Platforms. Major
              browsers provide the Users with various options when it comes to
              Cookies. The Users can usually set their browsers to block all
              third-party Cookies (which are those set by third-party companies
              collecting information on Websites operated by other companies),
              block all Cookies (including first-party Cookies such as the ones
              Tejimandi uses to collect search activity information about its Users),
              or block specific Cookies. To modify the Cookie settings on the
              Tejimandi Platforms, please visit the browser’s help settings. Flash
              cookies operate differently than browser Cookies and cannot be
              removed or blocked via web browser settings. By using the Tejimandi
              Platforms the User’s are set to accept Cookies and consent to
              Tejimandi’s use of Cookies in the manner described in this section.
            </p>
            <p>
              Tejimandi shall have no control over the usage of any third party
              cookies placed on the Tejimandi Platforms.
            </p>
            <h4>SHARING OF INFORMATION:</h4>
            <p>
              Tejimandi shall use the information collected from the User to verify
              the identity of the User, to contact Users, for purposes of use of
              the Tejimandi Platforms and for any other purpose with the consent of
              the User.
            </p>
            <p>
              Tejimandi will share some or all of the User’s Personally Identifiable
              Information with another business entity in the event such business
              entity merges with Tejimandi, acquires Tejimandi or enters into any other
              corporate restructuring. Such business entity shall be required to
              comply with this Privacy Policy with respect to the User’s
              Personally Identifiable Information;
            </p>
            <p>
              Tejimandi shall disclose the Personally Identifiable Information
              without requiring any prior consent from the Users where such
              disclosure is required to be made to a government agency mandated
              under the law to obtain such Personally Identifiable Information.
              Tejimandi shall be required to make such disclosures to the government
              agency in all such cases for the prevention, detection, and
              investigation of fraud including cyber related crimes.
            </p>
            <p>
              Tejimandi shall be compelled to disclose the Personally Identifiable
              information of the Users to a third party in all such cases where
              Tejimandi is acting in compliance of an order passed under law,
              directing Tejimandi to disclose such Personally identifiable
              Information.
            </p>
            <h4>ASSESSING, REVIEWING AND CHANGING PERSONAL INFORMATION:</h4>
            <p>
              Tejimandi will take reasonable steps to accurately record the personal
              information that the User provides to Tejimandi and any subsequent
              updates.
            </p>
            <p>
              Tejimandi encourages the User to review, update and correct the
              information that Tejimandi maintains about the User on the Tejimandi
              Platforms. Upon the User’s request, Tejimandi will delete any such
              information that is inaccurate, incomplete, or irrelevant for
              legitimate purposes, or is being processed in a way, which infringes
              any applicable legal requirement.
            </p>
            <h4>SECURITY PRECAUTIONS:</h4>
            <p>
              Tejimandi has implemented appropriate physical, electronic, and
              managerial procedures to safeguard and help prevent unauthorized
              access to the information of the User and to maintain data security.
              These safeguards take into account the sensitivity of the
              information that Tejimandi collects, process and stores and the current
              state of technology.
            </p>
            <p>
              Tejimandi follows generally accepted industry standards to protect the
              information submitted to it. However, no method of transmission over
              the Internet, or method of electronic storage, is 100% secure.
              Therefore, while Tejimandi strives to use commercially acceptable means
              to protect the information of the Users, Tejimandi cannot guarantee its
              absolute security and thereby usage in a manner that is inconsistent
              with the Privacy Policy.
            </p>
            <p>
              Tejimandi assumes no liability or responsibility for disclosure of the
              User’s information due to errors in transmission, unauthorized
              third-party access, or other causes beyond Tejimandi’s control. The
              User plays an important role in keeping its information secure. The
              User should not share its account information with anyone. If Tejimandi
              receives instructions through the User’s account and password,
              Tejimandi will consider that such User has authorized the instructions.
            </p>
            <p>
              Notwithstanding anything contained in the Privacy Policy or
              elsewhere, Tejimandi shall not be held responsible for any loss, damage
              or misuse of the User’s personal information, if such loss, damage
              or misuse is attributable to a Force Majeure Event.
            </p>
            <h4>CHANGES TO THE PRIVACY POLICY:</h4>
            <p>
              Tejimandi reserves the right to amend the Privacy Policy from time to
              time to reflect changes in the Applicable Law, Tejimandi’s data
              collection and use practices, the features of the Tejimandi Platforms
              or advances in technology.
            </p>
            <p>
              The User is requested to check this page periodically for changes.
              Use of information collected by Tejimandi is subject to the Privacy
              Policy in effect at the time such information is used. If Tejimandi
              makes any material changes to the Privacy Policy, Tejimandi will post
              the changes on the Tejimandi Platforms. The User is requested to review
              the changes carefully.
            </p>
            <p>
              The User’s continued use of the Tejimandi Platforms following the
              posting of changes to the Privacy Policy will constitute the User’s
              consent and acceptance of those changes.
            </p>
            <h4>GOVERNING LAW & DISPUTE:</h4>
            <p>
              The law governing the Terms shall be the substantive laws of the
              Republic of India, without giving effect to the conflicts of law
              principles of any jurisdiction.
            </p>
            <p>
              Any dispute arising out of or in connection with the Terms and / or
              the licence, including any question regarding its existence,
              validity or termination, shall be referred to and finally resolved
              by arbitration in accordance with the Arbitration Rules of the
              Mumbai Centre for International Arbitration (‘MCIA Rules’), which
              rules are deemed to be incorporated by reference in this clause. The
              seat of the arbitration shall be Mumbai, India. The Tribunal shall
              consist of one arbitrator, selected from the panel of arbitrators
              with technical experience in the field of information technology by
              Tejimandi. The language of the arbitration shall be English. The law
              governing this arbitration agreement shall be the Arbitration and
              Conciliation Act, 1996 (as amended and re-enacted at the relevant
              time).
            </p>
            <h4>GRIEVANCE OFFICER:</h4>
            <p>
              In accordance with Information Technology Act 2000 and rules made
              there under, the name and contact details of the Grievance Officer
              who can be contacted with respect to any complaints or concerns
              including those pertaining to breach of these Terms, and other
              polices or questions are published as under:
            </p>
            <p>
              E-mail address:
              {' '}
              <a href="mailto:support@tejimandi.com">support@tejimandi.com</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

StaticContent.propTypes = {};

export default StaticContent;
