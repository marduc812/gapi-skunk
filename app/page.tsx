'use client'
import { useState } from 'react'
import { rules } from '@/lib/rules'
import { SelectedOptionType, ResultsType, VulnerableAPI } from '@/lib/types'
import OptionsMenu from '@/components/OptionsMenu'
import AnalysisResults from '@/components/AnalysisResults'
import LoadingView from '@/components/LoadingView'
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image'

export default function Home() {
  const [token, setToken] = useState('');
  const [optionsSelected, setOptionsSelected] = useState(rules as SelectedOptionType[]);
  const [results, setResults] = useState<ResultsType>({ vulnerable: [], safe: [] });
  const [loading, setLoading] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false)
  const [language, setLanguage] = useState('bash')


  const notifyInvalidToken = () => toast('Invalid token', { icon: '❌', duration: 3000 });
  //const notifySomethingWentWrong = (callName: string) => toast.error(`Something went wrong while testing <b>${callName}</b>. Please try again.`, { icon: '❌', duration: 10000 });
  const notifySomethingWentWrong = (callName: string) => toast.error(
    <div>
      <p>Something went wrong while testing <b>{callName}</b></p>
      <p>Please try again.</p>
    </div>, { icon: '❌', duration: 10000 });

  const fetchTokenStatus = async (path: string, token: string, name: string) => {
    const res = await fetch(`${path}/?lang=${language}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: token })
    })

    if (res.status === 200) {
      return res.json()
    }
    else {
      const retry = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: token })
      })
      if (retry.status === 200) {
        return retry.json()
      } else {
        return { status: 'failed' }
      }
    }
  }

  const validateToken = (token: string) => {
    const regexPattern = /^AIza[0-9A-Za-z-_]{35}$/;
    const isMatch = regexPattern.test(token);
    return isMatch;
  }

  const submitToken = async () => {
    if (validateToken(token)) {
      let apiResponses: {
        vulnerable: VulnerableAPI[];
        safe: { name: string }[];
      } = { vulnerable: [], safe: [] };

      setLoading(true);
      setVisibleMenu(false);

      const fetchPromises = optionsSelected
        .filter((option) => option.selected)
        .map((option) =>
          fetchTokenStatus(option.path, token, option.name).then((res) => {
            if (res.status === 'error') {
              apiResponses.safe.push({ name: option.name });
            } else if (res.status === 'failed') {
              notifySomethingWentWrong(option.name);
            } else {
              apiResponses.vulnerable.push({
                name: option.name,
                description: option.description,
                poc: res.poc,
                codeLanguage: res.language,
              });
            }
          })
        );
      await Promise.all(fetchPromises);
      setResults(apiResponses);
    } else {
      notifyInvalidToken();
    }
    setLoading(false);
  };



  return (
    <main className="flex min-h-screen flex-col items-center p-2 lg:p-10 xl:p-12">
      <h1 className="text-4xl font-bold text-center group cursor-default flex flex-row">
        <Image src='/Google_Logo.svg' width={28} height={28} alt='logo' />
        <span className='hidden group-hover:inline'>oogle </span>
        API Skunk
      </h1>
      <p className="text-center w-full xl:w-3/4 2xl:w-1/2 text-slate-700 p-5">A free online tool to analyze Google API keys found during an assessment. Currently it performs 28 tests of 4 categories.
        The project is Open-Source and can be hosted locally using the DockerImage included in the repo. No information is stored or recording in any state of the analysis.</p>

      <div className='mt-10 flex flex-row justify-between border-2 border-black rounded-md w-full xl:w-3/4 2xl:w-1/2'>
        <input placeholder='Paste your API token' className='text-center w-full p-2' maxLength={39} value={token} onChange={(e) => setToken(e.target.value)}></input>
        <button className='bg-slate-900 hover:bg-slate-700 text-white font-bold px-10' onClick={submitToken}>Analyze</button>
      </div>

      <div className='m-2 flex flex-row justify-end w-full xl:w-3/4 2xl:w-1/2'>
        <p className='text-lg font-bold pr-2'> PoC Language: </p>

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value='bash'>Bash</option>
          <option value='python'>Python</option>
          <option value='powershell'>Powershell</option>
        </select>
      </div>

      <OptionsMenu options={optionsSelected} setOptions={setOptionsSelected} visibleMenu={visibleMenu} setVisibleMenu={setVisibleMenu} />

      {loading && <LoadingView />}

      {(results.vulnerable.length > 0 || results.safe.length > 0) && (
        <AnalysisResults analysis={results} codeLanguage={language} />
      )}
      <Toaster />
    </main>
  )
}
