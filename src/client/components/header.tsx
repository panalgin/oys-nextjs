import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
	return (
		<header className="w-full p-4">
			<div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
				<Link href="/" title="Okul - Açık Kaynak Okul Yönetim Sistemi">
					<Image
						src="/images/okul-logo.png"
						alt="Okul - Açık Kaynak Okul Yönetim Sistemi"
						width={380}
						height={120}
						priority
						style={{
							width: 'auto',
							height: 'auto',
						}}
					/>
				</Link>
				<nav className="mt-4 md:mt-0">
					<ul className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-4">
						<li>
							<Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
								Anasayfa
							</Link>
						</li>
						<li>
							<Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
								Ödül Görevleri
							</Link>
						</li>
						<li>
							<Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
								Ödül Listesi
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
