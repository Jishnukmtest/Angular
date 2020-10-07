import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService, Profile } from '../core';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  profile: Profile;
  currentUser: User;
  isUser: boolean;

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        // Load the current user's data.
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe();
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
  // refreshToken(refreshToken: any) {
  //   console.log('refreshing token');
  //   this.dataService.refreshToken(refreshToken).toPromise().then(data => {
  //     this.refreshTokenBody = JSON.parse(JSON.stringify(data));
  //     if (this.refreshTokenBody.access_token && this.refreshTokenBody.refresh_token) {
  //       localStorage.setItem('bitbucket-access-token', this.refreshTokenBody.access_token);
  //       localStorage.setItem('bitbucket-refresh-token', this.refreshTokenBody.refresh_token);
  //       setTimeout(() => {
  //         alert('Access token refreshed. Reloading page....');
  //         window.location.reload()
  //       }, 4000);
  //     }
  //     else {
  //       alert('Some authenticatoin error occurred!! Redirecting to login page...');
  //       window.location.href = AppConstants.loginHref;
  //     }
  //   });
  // }
}
