import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const MenuItems = (props) => {
    const { parentMenu } = props;

    const { pathname } = useRouter();
    const { t } = useTranslation('navigation');

    const [home, setHome] = useState(false)
	const [stories, setStories] = useState(false)
	const [works, setWorks] = useState(false)
	const [page, setPage] = useState(false)
	const [shop, setShop] = useState(false)

	const openMobileMenu = menu => {
		if (menu === 'home') {
			setHome(!home)
			setStories(false)
			setWorks(false)
			setPage(false)
			setShop(false)
		}
		if (menu === 'stories') {
			setHome(false)
			setStories(!stories)
			setWorks(false)
			setPage(false)
			setShop(false)
		}
		if (menu === 'works') {
			setHome(false)
			setStories(false)
			setWorks(!works)
			setPage(false)
			setShop(false)
		}
		else if (menu === 'page') {
			setHome(false)
			setStories(false)
			setWorks(false)
			setPage(!page)
			setShop(false)
		}
		if (menu === 'shop') {
			setHome(false)
			setStories(false)
			setWorks(false)
			setPage(false)
			setShop(!shop)
		}
	};

    return (
        <>
            <li className={parentMenu === 'home' ? 'menu-item menu-item-has-children active' : 'menu-item menu-item-has-children'}><Link href="#" title={t('topLevel.home')} onClick={() => { openMobileMenu('home'); }} className={home ? "active" : ""}><span>{t('topLevel.home')}</span></Link>
                <ul className={home ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={pathname === "/home-2" ? "menu-item active" : "menu-item"}><Link href="/home-2">{t('homeSub.portfolio')}</Link></li>
                    <li className={pathname === "/" ? "menu-item active" : "menu-item"}><Link href="/">{t('homeSub.fullPageSlider')}</Link></li>
                    <li className={pathname === "/home-3" ? "menu-item active" : "menu-item"}><Link href="/home-3">{t('homeSub.personalPortfolio')}</Link></li>
                    <li className={pathname === "/home-4" ? "menu-item active" : "menu-item"}><Link href="/home-4">{t('homeSub.personalCv')}</Link></li>
                    <li className={pathname === "/home-5" ? "menu-item active" : "menu-item"}><Link href="/home-5">{t('homeSub.creativeAgency')}</Link></li>
                    <li className={pathname === "/home-6" ? "menu-item active" : "menu-item"}><Link href="/home-6">{t('homeSub.businessCorporate')}</Link></li>
                </ul>
            </li>
            <li className={parentMenu === 'stories' ? 'menu-item menu-item-has-children active' : 'menu-item menu-item-has-children'}><Link href="#" title={t('topLevel.stories')} onClick={() => { openMobileMenu('stories'); }} className={stories ? "active" : ""}><span>{t('topLevel.stories')}</span></Link>
                <ul className={stories ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={pathname === "/blog/blog-right-sidebar" ? "menu-item active" : "menu-item"}><Link href="/blog/blog-right-sidebar">{t('storiesSub.blogRightSidebar')}</Link></li>
                    <li className={pathname === "/blog" ? "menu-item active" : "menu-item"}><Link href="/blog">{t('storiesSub.blogCard')}</Link></li>
                    <li className={pathname === "/blog/blog-left-thumb" ? "menu-item active" : "menu-item"}><Link href="/blog/blog-left-thumb">{t('storiesSub.blogListLeftThumb')}</Link></li>
                    <li className={pathname === "/blog/blog-random-thumb" ? "menu-item active" : "menu-item"}><Link href="/blog/blog-random-thumb">{t('storiesSub.blogListRandomThumb')}</Link></li>
                    <li className={pathname === "/blog/blog-right-thumb" ? "menu-item active" : "menu-item"}><Link href="/blog/blog-right-thumb">{t('storiesSub.blogListRightThumb')}</Link></li>
                    <li className={pathname === '/blog/ui-vs-ux-whats-the-difference' ? "menu-item active" : "menu-item"}><Link href="/blog/ui-vs-ux-whats-the-difference">{t('storiesSub.blogSingle')}</Link></li>
                </ul>
            </li>
            <li className={parentMenu === 'works' ? 'menu-item menu-item-has-children active' : 'menu-item menu-item-has-children'}><Link href="#" title={t('topLevel.works')} onClick={() => { openMobileMenu('works'); }} className={works ? "active" : ""}><span>{t('topLevel.works')}</span></Link>
                <ul className={works ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={pathname === "/project" ? "menu-item active" : "menu-item"}><Link href="/project">{t('worksSub.listStyle')}</Link></li>
                    <li className={pathname === "/project/project-standard" ? "menu-item active" : "menu-item"}><Link href="/project/project-standard">{t('worksSub.gridStandard')}</Link></li>
                    <li className={pathname === "/project/project-grid" ? "menu-item active" : "menu-item"}><Link href="/project/project-grid">{t('worksSub.gridStyle1')}</Link></li>
                    <li className={pathname === "/project/project-grid-2" ? "menu-item active" : "menu-item"}><Link href="/project/project-grid-2">{t('worksSub.gridStyle2')}</Link></li>
                    <li className={pathname === "/project/project-masonary" ? "menu-item active" : "menu-item"}><Link href="/project/project-masonary">{t('worksSub.gridMasonry')}</Link></li>
                    <li className={pathname === '/project/freezing-birthday' ? "menu-item active" : "menu-item"}><Link href="/project/freezing-birthday">{t('worksSub.projectSingle')}</Link></li>
                </ul>
            </li>
            <li className={parentMenu === 'page' ? 'menu-item menu-item-has-children active' : 'menu-item menu-item-has-children'}><Link href="#" title={t('topLevel.page')} onClick={() => { openMobileMenu('page'); }} className={page ? "active" : ""}><span>{t('topLevel.page')}</span></Link>
                <ul className={page ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={pathname === "/about" ? "menu-item active" : "menu-item"}><Link href="/about">{t('pageSub.aboutUs')}</Link></li>
                    <li className={pathname === "/team" ? "menu-item active" : "menu-item"}><Link href="/team">{t('pageSub.teamPage')}</Link></li>
                    <li className={pathname === "/image-gallery" ? "menu-item active" : "menu-item"}><Link href="/image-gallery">{t('pageSub.imageGallery')}</Link></li>
                    <li className={pathname === "/services" ? "menu-item active" : "menu-item"}><Link href="/services">{t('pageSub.services')}</Link></li>
                    <li className={pathname === "/404" ? "menu-item active" : "menu-item"}><Link href="/404">{t('pageSub.page404')}</Link></li>
                </ul>
            </li>
            <li className={pathname === "/contact" ? "menu-item active" : "menu-item"}><Link href="/contact" title={t('topLevel.contact')}><span>{t('topLevel.contact')}</span></Link></li>
            <li className={parentMenu === 'shop' ? 'menu-item menu-item-has-children active' : 'menu-item menu-item-has-children'}><Link href="#" title={t('topLevel.shop')} onClick={() => { openMobileMenu('shop'); }} className={shop ? "active" : ""}><span>{t('topLevel.shop')}</span></Link>
                <ul className={shop ? "sub-menu sub-menu-open" : "sub-menu"}>
                    <li className={pathname === "/shop" ? "menu-item active" : "menu-item"}><Link href="/shop">{t('shopSub.shopPage')}</Link></li>
                    <li className={pathname === '/shop/run-max-88' ? "menu-item active" : "menu-item"}><Link href="/shop/run-max-88">{t('shopSub.singleProduct')}</Link></li>
                    <li className={pathname === "/shop/cart" ? "menu-item active" : "menu-item"}><Link href="/shop/cart">{t('shopSub.cart')}</Link></li>
                    <li className={pathname === "/shop/checkout" ? "menu-item active" : "menu-item"}><Link href="/shop/checkout">{t('shopSub.checkout')}</Link></li>
                    <li className={pathname === "/shop/account" ? "menu-item active" : "menu-item"}><Link href="/shop/account">{t('shopSub.myAccount')}</Link></li>
                </ul>
            </li>
        </>
    );
}

export default MenuItems;
