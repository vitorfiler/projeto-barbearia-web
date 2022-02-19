import { Component, Inject, LOCALE_ID, Renderer2, OnInit } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icCalendar from '@iconify/icons-ic/baseline-calendar-today';
import icDashboard from '@iconify/icons-ic/baseline-dashboard';
import icCashier from '@iconify/icons-ic/attach-money';
import icSetting from '@iconify/icons-ic/baseline-settings';
import icWork from '@iconify/icons-ic/baseline-work';
import icComment from '@iconify/icons-ic/baseline-comment';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import { CommomService } from 'src/app/services/commom.service';


@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'vex';

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private commomService: CommomService,
    private router: Router) {
      Settings.defaultLocale = this.localeId;
      
      if (this.platform.BLINK) {
        this.renderer.addClass(this.document.body, 'is-blink');
      }
      
    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    showConfigButton: false,
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.document.body.dir = isRtl ? 'rtl' : 'ltr';
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));
    this.navigationService.items = [
      // icon: icLayers
      // icon: icAssigment
      // icon: icContactSupport
      // icon: icDateRange
      {
        label: 'Solicitações',
        type: 'link',
        route: '/solicitacoes',
        icon: icAssigment
      },
      {
        label: 'Painel',
        type: 'link',
        route: '/painel',
        icon: icDashboard
      }, 
      {
        label: 'Caixa',
        type: 'link',
        route: '/caixa',
        icon: icCashier
      },
      {
        label: 'Agenda',
        type: 'link',
        route: '/agenda',
        icon: icCalendar
      },
      {
        label: 'Serviços',
        type: 'link',
        route: '/servicos',
        icon: icWork
      },
      {
        label: 'Comentários',
        type: 'link',
        route: '/comentarios',
        icon: icComment
      },
      {
        label: 'Configurações',
        type: 'link',
        route: '/configuracoes',
        icon: icSetting
      }
    ];
  }
  ngOnInit(): void {

  }
}
