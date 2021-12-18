import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../styles/Classes.module.css'
import { FaBars, FaPlusCircle } from 'react-icons/fa'

export default function Home() {
	const accountData = []
	const fetchAccount = async (event) => {
		event.preventDefault()
		const CLEARBIT_API_KEY = process.env.CLEARBIT_API_KEY
		let accountNameWithoutSpaces = event.target.accountName.value.replace(
			/\s/g,
			'+'
		)
		const clearBitApiString = 
			'https://company.clearbit.com/v1/domains/find?name=' +
			accountNameWithoutSpaces
		try {
			const res = await fetch(clearBitApiString, {
				headers: {
					'Authorization': `Basic ${CLEARBIT_API_KEY}`,
					'Content-Type': 'application/json',
				},
				method: 'GET',
			})
			if (res.ok) {
				const clearBitData = await res.json()
				accountData.push(clearBitData)
				console.log(accountData)
			}
		} catch (err) {
			console.log(err)
		}

		event.target.reset()
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<nav className={styles.navigation}>
				<div className={styles.navContainer}>
					<FaBars className={styles.hamburgerMenu} />
					<div className={styles.mainLogo}>
						<Image
							src='/logos/prospectrove-logo.svg'
							width='200'
							height='60'
						/>
					</div>
				</div>
			</nav>
			<div className={styles.interface}>
				<nav className={styles.sidebar}>
					<ul>
						<li className={styles.sidebarButton}>
							<FaPlusCircle
								className={styles.sidebarButtonIcon}
							/>{' '}
							Account
						</li>
					</ul>
				</nav>
				<section className={styles.workArea}>
					<div className={styles.pageIndicator}>Accounts</div>
					<form
						onSubmit={fetchAccount}
						className={styles.accountsForm}
					>
						<input
							type='text'
							name='accountName'
							id='accountName'
							placeholder='Search for a brand name...'
							className={styles.accountNameInput}
							required
						/>
						<button
							type='submit'
							className={styles.accountFetchButton}
						>
							Search
						</button>
					</form>
					<table className={styles.accountsTable}>
						<thead>
							<tr>
								<th>Account</th>
								<th>Domain name</th>
								<th>Logo</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Microsoft</td>
								<td>microsoft.com</td>
								<td><img src="/logos/ms-logo.jpeg" alt="microsoft logo" width="50" height="50" /></td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
		</div>
	)
}
