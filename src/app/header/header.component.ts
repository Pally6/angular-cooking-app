import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  isLog = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onToastPage() {
    this.router.navigate(['/toast'], { relativeTo: this.route });
  }

  onLogout() {
    this.isLog = true;
  }

  onYes() {
    this.authService.logout();
    this.isLog = false;
  }

  onNo() {
    this.isLog = false;
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
