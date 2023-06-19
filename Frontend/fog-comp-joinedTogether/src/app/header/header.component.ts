import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Web3 from 'web3';

declare let window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  web3: any;
  nki: any;
  articleId: number = 1; //TUKI DEJ FUNKCIJO DA DOBI SVOJ NASLOV TISTO nki dej noter pa pol to uporabi
  contract: any;
  walletAddress!: string;


  constructor(private router: Router) {
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      this.retrieveWalletAddress();
    } else {
      console.log('Metamask not detected');
    }

    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum);
      this.retrieveWalletAddresses();
    } else {
      console.log('Metamask not detected');
    }
  }

  async retrieveWalletAddress() {
    try {
      // Request access to the user's accounts
      await window.ethereum.enable();
  
      // Get the array of accounts
      const accounts = await this.web3.eth.getAccounts();
  
      // Get the first account from the array
      this.walletAddress = accounts[0];
      //this.articleId = accounts[0]; POTEM TO PODAŠ ZA ID
  
      console.log('Wallet Address:', this.walletAddress);
    } catch (error) {
      console.log('Error retrieving wallet address:', error);
    }
  }

  async retrieveWalletAddresses() {
    try {
      // Request access to the user's accounts
      await window.ethereum.enable();
  
      // Get the array of accounts
      const accounts = await this.web3.eth.getAccounts();
  
      // Store all the wallet addresses in an array
      const walletAddresses = accounts;
  
      console.log('Wallet Addresses:', walletAddresses);
    } catch (error) {
      console.log('Error retrieving wallet addresses:', error);
    }
  }
 
  goToAuthorsProfile() {
    //TUKI NARDIMO PREVERJANJE ČE JE USER S TEM ADDRESSOM V BAZI
    this.router.navigate(['authors-profile/myprofile', this.walletAddress]);
  }

  goToListing() {
    this.router.navigate(['article-listing']);
  }

}
